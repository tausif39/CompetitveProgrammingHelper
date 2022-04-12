var priority={}
function init_priority(){
    priority['**']=5;
    priority['<<']=5;
    priority['>>']=5;
    priority['%']=5;
    priority['&&']=4
    priority['||']=4
    priority['or']=4
    priority['and']=4
    priority['^']=priority['&']=priority['|']=4;
    priority['*']=priority['/']=3
    priority['-']=priority['+']=2
}
init_priority()
function prec(c) {
    if (c in priority){
        return priority[c]
    }
    return -1;
}

function infixToPostfix(s) {
    
    st=[]; 
    var result=[];
 
    for(var i = 0; i < s.length; i++) {
        var c = s[i];
        if(c==' '){continue}
        if(i+2<s.length && (s.slice(i,i+2) in priority)){
            c=s.slice(i,i+2)
        }
        if(i+2<s.length && (s.slice(i,i+3)) in priority){
            c=s.slice(i,i+3)
        }
        console.log(c)
        
        if((c.length==1) && ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))){
            c = s[i];
            while((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || (c=='.')){

                result += c;
                i++
                if(i==s.length){
                    break;
                }
                c = s[i];
            }
            i--;
            result+=' '
        }
 
        
        else if(c == '('){

            st.push('(');
        }
 
        
        else if(c == ')') {
            while(st[st.length-1] != '(')
            {
                result += st[st.length-1];
                result+=' '
                st.pop();
            }
            st.pop();
        }
        else {
            var out=st[st.length-1]
            console.log("out",out)
            while(!st==[] && prec(c) <= prec(out)) {
                result += st[st.length-1];
                result+=' '
                st.pop(); 
                if(st.length)
                out=st[st.length-1]
                else{
                    break;
                }
            }
            st.push(c);
        }
        if(c.length==2){
            i+=1
        }
        if(c.length==3){
            i+=2;
        }
    }
    
    
    while(st.length) {
        result += st[st.length-1];
        result+=' '
        st.pop();
    }
 
    return result
}
ans=infixToPostfix("1 and 3 + 6 or 5 + 2 && 3 * 4 || 3")
console.log(ans)
ans=infixToPostfix("1.2 + 3")
console.log(ans)