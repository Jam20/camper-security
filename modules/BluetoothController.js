import { BleManager, Device } from "react-native-ble-plx"
import { atob, btoa} from "react-native-quick-base64"


const serviceID = "da988935-3f12-9da1-4f4b-1c58661e4872"
const characteristicID = "eb2abb47-7c85-e99c-7b4e-5c68ee1ac042"
const messageIntervalMS = 200

const manager = new BleManager()


var connectedDevice = null
var nextMessage = {}
var prevMessageTime = Date.now()
var timerId = null

/**
 * Connects the device after scanning for it
 * @param {null} error 
 * @param {Device} device 
 * @returns 
 */
const scanAndConnect = async (error,device) => {
    if(error) return
    if(device.name == "Camper Security Device"){
        manager.stopDeviceScan()
        connectedDevice = await device.connect()
            .then((device)=>device.discoverAllServicesAndCharacteristics())         
    }
}

const isConnected = async () => connectedDevice != null && await connectedDevice.isConnected()

export const BluetoothController = {
    "connect": (callback)=> {
        const subscription = manager.onStateChange((state)=> {
            if(state != "PoweredOn") return
            const callbackWrapper = async (error, device) => {
                await scanAndConnect(error, device)
                if(await isConnected()) callback()
            }

            manager.startDeviceScan(null,null,callbackWrapper)
            subscription.remove()
        },true)
    },

    "isConnected": isConnected,

    "sendRequest": async (request)=>{
        //clear any previous timers
        if(timerId != null) clearTimeout(timerId)
        const messageToSend = {...nextMessage, ...request}
        //if it hasn't been messageInterval ms
        if(Date.now() - prevMessageTime < messageIntervalMS) {
            timerId = setTimeout(()=>BluetoothController.sendRequest(messageToSend),messageIntervalMS - Date.now() - prevMessageTime) //add new timer so messageInterval ms are between requests
            nextMessage = messageToSend
            return
        }

        prevMessageTime = Date.now() //set new previous time
        if(!await isConnected()) return
        const encodedMessage = btoa(JSON.stringify(messageToSend))
        await connectedDevice.writeCharacteristicWithResponseForService(serviceID, characteristicID, encodedMessage)
        nextMessage = {}
    },

    "getStatus": async () => {
        if(!await isConnected()) return null
        const characteristic = await connectedDevice.readCharacteristicForService(serviceID, characteristicID)
        const base64 = characteristic.value
        const string = atob(base64)
        const byteArray = string.split(",")

        return {
            "running": byteArray[0],
            "left": byteArray[1],
            "right": byteArray[2],
            "reverse": byteArray[3]
        }
    },

    "closeConnection": () => {
        connectedDevice.cancelConnection()
        connectedDevice = null
    }
}