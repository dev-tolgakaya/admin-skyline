import { createSlice } from "@reduxjs/toolkit";

import { getChats, getGroups, getContacts, getMessages, addMessage, deleteMessage } from "./thunk";

export const initialState = {
    chats: [],
    groups: [],
    contacts: [],
    messages: [],
    error: {},
    loading: true
};

const ChatsSlice = createSlice({
    name: 'ChatsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChats.fulfilled, (state: any, action: any) => {
            state.chats = action.payload;
            state.loading = true;
        });
        builder.addCase(getChats.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getGroups.fulfilled, (state: any, action: any) => {
            state.groups = action.payload;
            state.loading = true;
        });
        builder.addCase(getGroups.rejected, (state: any, action: any) => {
            state.groups = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getContacts.fulfilled, (state: any, action: any) => {
            state.contacts = action.payload;
            state.loading = true;
        });
        builder.addCase(getContacts.rejected, (state: any, action: any) => {
            state.contacts = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getMessages.fulfilled, (state: any, action: any) => {
            state.messages = action.payload;
            state.loading = true;
        });
        builder.addCase(getMessages.rejected, (state: any, action: any) => {
            state.messages = action.payload ? action.payload?.error : null;
        });

        builder.addCase(addMessage.fulfilled, (state: any, action: any) => {
            state.messages.map((item: any) => item.usermessages.push(action.payload));

        });
        builder.addCase(addMessage.rejected, (state: any, action: any) => {
            state.messages = action.payload.error || null;
        });
        builder.addCase(deleteMessage.fulfilled, (state: any, action: any) => {
            state.messages = (state.messages || []).map((data: any) => {
                const updatedUserMessages = data.usermessages.filter((message: any) => message.id !== action.payload)
                return { ...data, usermessages: updatedUserMessages }
            });
        });
        builder.addCase(deleteMessage.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

    }
})

export default ChatsSlice.reducer;