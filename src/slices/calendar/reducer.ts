import { createSlice } from "@reduxjs/toolkit";

import { getEvents, getCategories, addNewEvent, deleteEvent, updateEvent } from "./thunk";

export const initialState = {
    events: [],
    catogories: [],
    error: {}
};

const CalendarSlice = createSlice({
    name: 'CalendarSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state: any, action: any) => {
            state.events = action.payload;
        });
        builder.addCase(getEvents.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
            state.catogories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(addNewEvent.fulfilled, (state: any, action: any) => {
            state.events.push(action.payload);
        });
        builder.addCase(addNewEvent.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateEvent.fulfilled, (state: any, action: any) => {
            state.events = (state.events || []).map((event: any) =>
                event.id.toString() === action.payload.id.toString()
                    ? { ...event, ...action.payload }
                    : event
            );
        });

        builder.addCase(updateEvent.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteEvent.fulfilled, (state: any, action: any) => {
            state.events = state.events.filter(
                (event: any) => event.id.toString() !== action.payload.toString()
            );
        });

        builder.addCase(deleteEvent.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
})

export default CalendarSlice.reducer;