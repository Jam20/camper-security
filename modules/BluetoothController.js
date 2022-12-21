import { BleManager, Device } from "react-native-ble-plx"
import { atob, btoa} from "react-native-quick-base64"


const serviceID = "da988935-3f12-9da1-4f4b-1c58661e4872"
const characteristicID = "eb2abb47-7c85-e99c-7b4e-5c68ee1ac042"
const messageIntervalMS = 200 

const manager = new BleManager()


var connectedDevice = null
var nextMessage = null
var subscription = null
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

const messageSubscription = async () => {
    if(!await isConnected() || !nextMessage) return
    const stringMessage = stringifyMessage(nextMessage)
    const encodedMessage = btoa(stringMessage)
    await connectedDevice.writeCharacteristicWithResponseForService(serviceID,characteristicID,encodedMessage)
    nextMessage = null
}

const stringifyMessage = (message) =>{
    return `${message.running},${message.left},${message.right},${message.reverse}`
}

const isConnected = async () => connectedDevice != null && await connectedDevice.isConnected()

export const BluetoothController = {
    "connect": (callback)=> {
        const subscription = manager.onStateChange((state)=> {
            if(state == "PoweredOn"){
                const callbackWrapper = async (error,device)=>{
                    await scanAndConnect(error, device)
                    if(await isConnected())
                    subscription = setInterval(messageSubscription, messageIntervalMS)
                    callback()
                }
                manager.startDeviceScan(null,null,callbackWrapper)
            }
            subscription.remove()
        },true)
    },

    "isConnected": isConnected,

    "sendRequest": async (request)=>{
        nextMessage = {...nextMessage, ...request}
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
        subscription.remove()
        connectedDevice.cancelConnection()
        connectedDevice = null
    }
}