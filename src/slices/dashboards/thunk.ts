import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getEarningChartsData as getEarningChartsDataApi,
    getTopSellingData as getTopSellingDataApi,
    getWeeklyData as getWeeklyDataApi,
    getYearlyData as getYearlyDataApi,
    getMonthlyData as getMonthlyDataApi,
    getTranscation as getTranscationApi,
    getWalletBalance as getWalletBalanceApi,
    getVisitors as getVisitorsApi,
    getstatisticsApplications as getstatisticsApplicationsApi
} from "../../helpers/fakebackend_helper";

export const getEarningChartsData = createAsyncThunk("dashboard/getEarningChartsData", async (month: any) => {
    try {
        const response = getEarningChartsDataApi(month);
        return response;
    } catch (error) {
        return error;
    }
});

export const getTopSellingData = createAsyncThunk("dashboard/getTopSellingData", async (month: any) => {
    try {
        const response = getTopSellingDataApi(month);
        return response;
    } catch (error) {
        return error;
    }
});

export const getChartData = createAsyncThunk("dashboard/getChartData", async (data: any) => {
    try {
        var response: any;
        if (data === "weekly") {
            response = getWeeklyDataApi(data);
        }
        if (data === "monthly") {
            response = getMonthlyDataApi(data);
        }
        if (data === "yearly") {
            response = getYearlyDataApi(data);
        }
        return response;

    } catch (error) {
        return error;
    }
});

export const getTranscation = createAsyncThunk("dashboard/getTranscation", async () => {
    try {
        const response = getTranscationApi();
        return response;
    } catch (error) {
        return error;
    }
});

// dashaboard-crypto
// Wallet Balance
export const getWalletBalance = createAsyncThunk("dashboard/getWalletBalance", async (data: any) => {
    try {
        const response = getWalletBalanceApi(data);
        return response;
    } catch (error) {
        return error;
    }
});

// dashaboard-blog
// Visitors
export const getVisitors = createAsyncThunk("dashboard/getVisitors", async (data: any) => {
    try {
        const response = getVisitorsApi(data);
        return response;
    } catch (error) {
        return error;
    }
});

// dashaboard-job
// statistics Applications
export const getstatisticsApplications = createAsyncThunk("dashboard/getstatisticsApplications", async (data: any) => {
    try {
        const response = getstatisticsApplicationsApi(data);
        return response;
    } catch (error) {
        return error;
    }
});