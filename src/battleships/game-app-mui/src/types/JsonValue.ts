interface JSONObject {
    [x: string]: JsonValue;
}

interface JSONArray extends Array<JsonValue> { 

}
export type JsonValue = string | number | boolean | JSONObject | JSONArray;
