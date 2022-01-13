export const console_log = (a=null,b=null,c=null,d=null,e=null) => {
    if(a!=null){
        var showOnly = localStorage.getItem('showOnly');
        if(typeof showOnly!='undefined'){
            if(showOnly.length > 0){
                var index = showOnly.includes(a);
                if(index > -1){
                    console.log(a);
                    if(b!=null){
                        console.log(b);
                    }
                    if(c!=null){
                        console.log(c);
                    }
                    if(d!=null){
                        console.log(d);
                    }
                    if(e!=null){
                        console.log(e);
                    }
                }
            }
        }
    }
}