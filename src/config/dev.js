
let PORT = 9090

if(process.env.NODE_ENV == 'test'){
	PORT = 9001
}

export default PORT
