import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';

// State Handlers
const handleLoading = (state, loadingStatus) => {
  state.loading = loadingStatus;
  state.error = null;
};
const handlePending = state => {
  handleLoading(state, true);
};
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.loading = false;
};

// Async Functions
export const fetchFeedbackAnalysis = createAsyncThunk(
  'feedbackData/fetchFeedbackAnalysis',
  async (courseId, { getState }) => {
    try {
      const course = courseId || null;
      const response = await api.get(`/feedbackData`, { courseId: course });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchGroups = createAsyncThunk(
  'feedbackData/fetchGroups',
  async (groupData, { getState }) => {
    try {
      const group = groupData || null;
      console.log(group);

      const response = await api.post(`/feedbackData/groups`, {
        groupData: group,
      });
      console.log('feedback data slice api call done');

      return response.data.freqData;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const feedbackDataSlice = createSlice({
  name: 'feedbackData',
  initialState: {
    groups: [],
    feedbackSentiment: {},
    barChartData: [[], [], []],
    wordCloudData: [],
    scatterChartData: [],
    freqData: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeedbackAnalysis.pending, handlePending)
      .addCase(fetchFeedbackAnalysis.fulfilled, (state, action) => {
        state.groups = action.payload.groups;
        state.feedbackSentiment = action.payload.feedbackSentiment;
        state.barChartData = action.payload.barChartData;
        state.wordCloudData = action.payload.wordCloudData;
        state.scatterChartData = action.payload.scatterChartData;
      })
      .addCase(fetchFeedbackAnalysis.rejected, handleRejected)
      .addCase(fetchGroups.pending, handlePending)
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.freqData = action.payload;
        // console.log(state.feedbackInfo);
        // console.log('data stuff in feedback data slice');
      })
      .addCase(fetchGroups.rejected, handleRejected);
  },
});

export default feedbackDataSlice.reducer;
