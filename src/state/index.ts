import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  courseEditor: {
    sections: ISection[];
    isChapterModalOpen: boolean;
  };
}

const initialState = {
  courseEditor: {
    sections: [],
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
