import { BleManager, Device } from "react-native-ble-plx"
import { toByteArray, fromByteArray} from "react-native-quick-base64"


const serviceID = "da988935-3f12-9da1-4f4b-1c58661e4872"
const characteristicID = "eb2abb47-7c85-e99c-7b4e-5c68ee1ac042"

const manager = new BleManager()


var connectedDevice = null
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

const isConnected = () => connectedDevice != null

export const BluetoothController = {
    "connect": (callback)=> {
        const subscription = manager.onStateChange((state)=> {
            if(state == "PoweredOn"){
                const callbackWrapper = async (error,device)=>{
                    await scanAndConnect(error, device)
                    if(isConnected())
                    callback()
                }
                manager.startDeviceScan(null,null,callbackWrapper)
            }
            subscription.remove()
        },true)
    },
    "isConnected": isConnected,

    "sendRequest": async (running, left, right, reverse)=>{
        if(!isConnected()) return 
        const array = new Uint8Array(4)
        array[0] = running
        array[1] = left
        array[2] = right
        array[3] = reverse
        const base64ToSend = fromByteArray(array)
        await connectedDevice.writeCharacteristicWithResponseForService(serviceID,characteristicID,base64ToSend)
    },
    "getStatus": async () => {
        if(!isConnected()) return null
        const characteristic = await connectedDevice.readCharacteristicForService(serviceID, characteristicID)
        const base64 = characteristic.value
        
        const byteArray = toByteArray(base64)

        return {
            "running": byteArray[0],
            "left": byteArray[1],
            "right": byteArray[2],
            "reverse": byteArray[3]
        }
    }
}