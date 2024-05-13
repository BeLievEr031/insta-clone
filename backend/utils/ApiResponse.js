class ApiResponse{
    status = true;
    data = null;
    message = ""

    constructor(data=null,message){
        this.data = data;
        this.message = message;
        this.status = true
    }
}


export default ApiResponse;