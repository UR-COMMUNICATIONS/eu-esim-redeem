import { createSlice } from "@reduxjs/toolkit";

const SIM = ['SIM', 'S']
const ESIM = ['ESIM', 'E']

const initialState = {
    devices: []
};
const deviceSlice = createSlice({
    name: "deviceSlice",
    initialState,
    reducers: {
        setDevices: (state, action) => {
            let updateDeivces = action.payload
            updateDeivces = updateDeivces.map(device => {
                let device_type = device.device_type?.toUpperCase()
                let provider = device.provider?.toUpperCase()
                if (SIM.includes(device_type)) {
                    device_type = 'S'
                }
                else if (ESIM.includes(device_type)) {
                    device_type = 'E'
                }
                else {
                    provider = device_type
                    device_type = 'D'
                }
                return {
                    ...device,
                    device_type: device_type,
                    provider: provider
                }
            })

            return {
                ...state, devices: updateDeivces,
            };
        },
        resetDevice: () => initialState,
    },
});

export const { setDevices } = deviceSlice.actions;
export default deviceSlice.reducer;



