import { writable } from "svelte/store";

// Pattern sample: persistent store, backed by localStorage
/*
const storedValue = localStorage.getItem("testValue");
export const valueStore = writable(storedValue);
valueStore.subscribe(value => {
    localStorage.setItem("testValue", value || "defaultValue");
});
*/

// Needed for api.js
// export const authToken = writable(token);
// export const baseUrl = writable(window.location.protocol + "//" + window.location.host + "/api");
