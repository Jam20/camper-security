import { BleManager, Device } from "react-native-ble-plx"

const manager = new BleManager()
var device = null
/**
 * 
 * @param {null} error 
 * @param {Device} device 
 * @returns 
 */
const scanAndConnect = async (error,device) => {
    if(error) return

    if(device.name == "Camper_device_name"){
        device = await device.connect().then((device)=>device.discoverAllServicesAndCharacteristics())
    }
}

export const BluetoothController = {
    "connect": ()=> {
        manager.startDeviceScan(null,null,scanAndConnect)
    },
    "isConnected": ()=>{
        return device != null
    },
    "sendRequest": (running, left, right, reverse)=>{
        
    },
    "getStatus": () => {

    }
}