import {getAddress} from '../../services/apiGeocoding'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


const initialState = {
  username:'', 
  status: 'idle',
  position: {},
  address:'',
  error:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
      updateName(state, action){
        state.username = action.payload
      }
    },
    extraReducers:(builder) => {
      builder.addCase(fetchAddress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle',
        state.position = action.payload.position
        state.address = action.payload.address
      })
   .addCase(fetchAddress.rejected, (state, action)=>  {
        state.status = 'error'
        state.error = action.error.message
      })
    }
})


function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async () => {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
    
    //payload of the fulfilled state
    return { position, address };
  }
)


export const {updateName} = userSlice.actions;


export default userSlice.reducer;