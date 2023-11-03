import { createSlice } from "@reduxjs/toolkit";

import { getEarningChartsData, getTopSellingData, getChartData, getTranscation, getWalletBalance, getVisitors, getstatisticsApplications } from "./thunk";

export const initialState = {
    dashboard: [],
    dashboardTranscation: [],
    dashboardSaas: [],
    dashboardChartData: [],
    dashboardCrypto: [],
    dashboardVisitors: [],
    dashboardstatisticsApplications: [],
    error: {}
};

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getEarningChartsData.fulfilled, (state: any, action: any) => {
            state.dashboard = action.payload;
        });

        builder.addCase(getEarningChartsData.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getTopSellingData.fulfilled, (state: any, action: any) => {
            state.dashboardSaas = action.payload;
        });

        builder.addCase(getTopSellingData.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getChartData.fulfilled, (state: any, action: any) => {
            state.dashboardChartData = action.payload;
        });

        builder.addCase(getChartData.rejected, (state: any, action: any) => {
            state.error =  action.payload ? action.payload?.error : null;
        });

        builder.addCase(getTranscation.fulfilled, (state: any, action: any) => {
            state.dashboardTranscation = action.payload;
        });

        builder.addCase(getTranscation.rejected, (state: any, action: any) => {
            state.error =  action.payload ? action.payload?.error : null;
        });
        builder.addCase(getWalletBalance.fulfilled, (state: any, action: any) => {
            state.dashboardCrypto = action.payload;
        });

        builder.addCase(getWalletBalance.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getVisitors.fulfilled, (state: any, action: any) => {
            state.dashboardVisitors = action.payload;
        });
        builder.addCase(getVisitors.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getstatisticsApplications.fulfilled, (state: any, action: any) => {
            state.dashboardstatisticsApplications = action.payload;
        });
        builder.addCase(getstatisticsApplications.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
    }
})

export default dashboardSlice.reducer;