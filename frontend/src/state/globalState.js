import { createState, useState } from '@hookstate/core';

import axios from "axios";

async function getData() {
    try {
        const d = await axios.get("http://127.0.0.1:5000/status", {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });

        return {
            loggedIn: true,
            username: d.data.username,
            role: d.data.role
        }
    } catch (error) {
        return {
            loggedIn: false,
            username: "",
            role: ""
        }
    }
}

const globalState = createState(getData());

export function useGlobalState() {
    const state = useState(globalState);

    return ({
        get loggedIn() {
            if (state.promised) {
                return false;
            }

            return state.loggedIn.get()
        },

        toggleLoggedIn() {
            state.loggedIn.set(p => !p)
        },

        get username() {
            if (state.promised) {
                return "";
            }

            return state.username.get()
        },

        setUsername(n) {
            state.username.set(n)
        },

        get role() {
            if (state.promised) {
                return "";
            }

            return state.role.get()
        },

        setRole(n) {
            state.role.set(n)
        }
    });
}