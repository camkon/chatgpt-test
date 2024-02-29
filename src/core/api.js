export const BASE_URL = 'https://verdictbook.in/api/'

export const api = {
    //file upload
    docs_upload : BASE_URL + 'docs/upload',
    docs_list : BASE_URL + 'docs/list',
    docs_delete : BASE_URL + 'docs/delete',
    docs_download : 'https://verdictbook.in/api/docs/getfile',    
    
    //search
    search : BASE_URL + 'search/',

    //prompt
    get_prompt : BASE_URL + 'chat/getprompt',
    set_prompt : BASE_URL + 'chat/setprompt',
    
    
    //chat
    chat : BASE_URL + 'chat/',

    //history
    history_get : BASE_URL + 'history/get',

    //settings
    settings_get : BASE_URL + 'settings/get',
    settings_save : BASE_URL + 'settings/save',
}