
const initialState = {
    formData: {
      fullName: "",
      age: "",
      sex: "",
      phone: "",
      idType: "",
      id: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    tableData: [], // To store form data for displaying in a table
  };
  
  const formReducer = (state = initialState, action: { type: string; payload: any; } ) => {
    switch (action.type) {
      case "UPDATE_FORM_DATA":
        return {
          ...state,
          formData: { ...state.formData, ...action.payload },
        };
      case "ADD_TO_TABLE":
        return {
          ...state,
          tableData: [...state.tableData, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  