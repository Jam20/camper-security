import { BleManager, Device } from "react-native-ble-plx"
import { atob, btoa } from "react-native-quick-base64"


const serviceID = "da988935-3f12-9da1-4f4b-1c58661e4872"
const lightCharID = "eb2abb47-7c85-e99c-7b4e-5c68ee1ac042"
const voltageCharID = "ea2abb47-7c85-e99c-7b4e-5c68ee1ac042"
const timerCharID = "dc2abb47-7c85-e99c-7b4e-5c68ee1ac042"
const securityCharID = "db2abb47-7c85-e99c-7b4e-5c68ee1ac042"


const messageIntervalMS = 30

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
const scanAndConnect = async (error, device) => {
    if (error) return
    if (device.name == "Camper Security Device") {
        manager.stopDeviceScan()
        connectedDevice = await device.connect()
            .then((device) => device.discoverAllServicesAndCharacteristics()).then((device) => device.requestMTU(100))
    }
}

const isConnected = async () => connectedDevice != null && await connectedDevice.isConnected()

const transformMessage = (requestObj) => {
    if (requestObj.enable != undefined) return {security: requestObj.enable ? 1:0, sense: requestObj.band}
    if (requestObj.startTime != undefined) return { timer: [requestObj.startTime, requestObj.endTime] }

    return {
        lights: [
            requestObj.left ?? 8191,
            requestObj.right ?? 8191,
            requestObj.reverse ?? 8191,
            requestObj.running ?? 8191,
        ]
    }
}

const connect = (callback) => {
    const subscription = manager.onStateChange((state) => {
        if (state != "PoweredOn") return
        const callbackWrapper = async (error, device) => {
            await scanAndConnect(error, device)
            if (await isConnected()) callback()
        }

        manager.startDeviceScan(null, null, callbackWrapper)
        subscription.remove()
    }, true)
}

const sendRequest = async (request) => {
    //clear any previous timers
    if (timerId != null) clearTimeout(timerId)
    const messageToSend = { ...nextMessage, ...request }

    //if it hasn't been messageInterval ms
    if (Date.now() - prevMessageTime < messageIntervalMS) {
        const newTimout = messageIntervalMS - Date.now() - prevMessageTime
        timerId = setTimeout(() => BluetoothController.sendRequest(messageToSend), newTimout) //add new timer so messageInterval ms are between requests
        nextMessage = messageToSend
        return
    }

    prevMessageTime = Date.now() //set new previous time
    const encodedMessage = btoa(JSON.stringify(transformMessage(messageToSend)))

    const id = messageToSend.startTime != undefined ? timerCharID : lightCharID
    const charID = messageToSend.enable != undefined ? securityCharID : id
    //console.log(JSON.stringify(messageToSend))
    console.log(JSON.stringify(transformMessage(messageToSend)))

    if (!await isConnected()) return
    await connectedDevice.writeCharacteristicWithResponseForService(serviceID, charID, encodedMessage)
}

const getStatus = async () => {
    if (!await isConnected()) return null
    const characteristic = await connectedDevice.readCharacteristicForService(serviceID, voltageCharID)
    const string = atob(characteristic.value)

    return JSON.parse(string)
}

const closeConnection = () => {
    connectedDevice.cancelConnection()
    connectedDevice = null
}
export const BluetoothController = {
    connect: connect,
    isConnected: isConnected,
    sendRequest: sendRequest,
    getStatus: getStatus,
    closeConnection: closeConnection
}