export const initialStore=()=>{
	return{
		all_activities: [],
		user: {
			id: null,
			username: "",
			avatar_url: "",
			is_professional: false
		}
	}
}

export default function storeReducer(store, action = {}) {
	switch(action.type){
		case 'activities':
			return {
				...store,
				all_activities: action.payload
			};
		case 'loadUser':
			return{
				...store,
				user: {id: action.payload.id, username: action.payload.username, avatar_url: action.payload.avatar_url, is_professional: action.payload.is_professional}
			}
		case 'closeSession':
			return{
				...store,
				user: {id: null,username: "",avatar_url: ""}
			}
		default:
			throw Error('Unknown action.');
	}    
}
