import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],
    topPriorityPlans: [],
    localPlans: [],
};
const planSlice = createSlice({
    name: "planSlice",
    initialState,
    reducers: {
        setTopPriorityPlans: (state, action) => {
            return {
                ...state,
                topPriorityPlans: action?.payload || [],
                packages: action?.payload || []
            };
        },
        setLocalPlans: (state, action) => {
            return {
                ...state,
                localPlans: action?.payload || [],
            };
        },
        resetPlan: () => initialState,
    },
});

export const { setTopPriorityPlans, setLocalPlans, resetPlan } = planSlice.actions;
export default planSlice.reducer;



