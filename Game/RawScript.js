var Places=[];
var Mounts=[];

function start() {
  Places[0]=9;
  for (let i = 1; i < 9; i++) { 
    var mount=Math.ceil(Math.random() * 8);
    while(Mounts.includes(mount)){
      if(mount==8){
        mount =1;
      }else{
        mount++;
      }
    }
    document.getElementById(i).innerHTML=mount;
    Mounts[i] = mount;
    Places[i]=i;
  }
}

window.start(); 

function win(){
  for (let i = 1; i < 9; i++) { 
    if(Places[i]!=Mounts[i]){
      return false;
    }
  }
  return true;
}

function b_click(but_id)
{
  var x = Places[but_id];
  var z = Places[0];
  var oc= but_id %3;
  var dc= Places[0] %3;
  var or= Math.ceil(but_id /3);
  var dr= Math.ceil(Places[0]/3);
  if(x+3==z){//down
    switch(or){
        case 3:
          switch(dr){
            case 2:
          document.getElementById(but_id).style.top = "-62px";
              break;
            case 3:
          document.getElementById(but_id).style.top = "0px";
              break;              
          }
          break;
        case 2:
          switch(dr){
            case 2:
          document.getElementById(but_id).style.top = "0px";
              break;
            case 3:
          document.getElementById(but_id).style.top = "62px";
              break;              
          }  
        break;
        case 1:
          switch(dr){
            case 2:
          document.getElementById(but_id).style.top = "62px";
              break;
            case 3:
          document.getElementById(but_id).style.top = "124px";
              break;              
          }    
        break;
    }
    Places[0]=x;
    Places[but_id]=z;
  }else if(x-3==z){//up
    switch(or){
        case 3:
          switch(dr){
            case 2:
          document.getElementById(but_id).style.top = "-62px";
              break;
            case 1:
          document.getElementById(but_id).style.top = "-124px";
              break;              
          }
          break;
        case 2:
          switch(dr){
            case 2:
          document.getElementById(but_id).style.top = "0px";
              break;
            case 1:
          document.getElementById(but_id).style.top = "-62px";
              break;              
          }  
        break;
        case 1:
          switch(dr){
            case 2:
          document.getElementById(but_id).style.top = "62px";
              break;
            case 1:
          document.getElementById(but_id).style.top = "0px";
              break;              
          }    
        break;
    }
    Places[0]=x;
    Places[but_id]=z;
  }else if(x+1==z){//right
    switch(oc){
      case 2:
          switch(dc){
            case 0:
          document.getElementById(but_id).style.left = "64px";
              break;
            case 2:
          document.getElementById(but_id).style.left = "0px";
              break;              
          }
          break;
        case 1:
          switch(dc){
            case 0:
          document.getElementById(but_id).style.left = "128px";
              break;
            case 2:
          document.getElementById(but_id).style.left = "64px";
              break;              
          }  
        break;
        case 0:
          switch(dc){
            case 0:
          document.getElementById(but_id).style.left = "0px";
              break;
            case 2:
          document.getElementById(but_id).style.left = "-64px";
              break;              
          }   
        break;
    }
    Places[0]=x;
    Places[but_id]=z;
  }else if(x-1==z){//left
    switch(oc){
        case 2:
          switch(dc){
            case 1:
          document.getElementById(but_id).style.left = "-64px";
              break;
            case 2:
          document.getElementById(but_id).style.left = "0px";
              break;              
          }
          break;
        case 1:
          switch(dc){
            case 1:
          document.getElementById(but_id).style.left = "0px";
              break;
            case 2:
          document.getElementById(but_id).style.left = "64px";
              break;              
          }  
        break;
        case 0:
          switch(dc){
            case 1:
          document.getElementById(but_id).style.left = "-128px";
              break;
            case 2:
          document.getElementById(but_id).style.left = "-64px";
              break;              
          }    
        break;
    }
    Places[0]=x;
    Places[but_id]=z;
  }
  if(win()){
    document.getElementById('txt').innerHTML="WIN";
  }
} 