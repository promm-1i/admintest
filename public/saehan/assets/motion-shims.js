
(function(global){
  if(global.ScrambleTextPlugin)return;
  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  global.ScrambleTextPlugin={
    name:'scrambleText',
    init:function(target,value){
      this.target=target;
      this.start=target.textContent||'';
      this.end=typeof value==='string'?value:String((value&&value.text)||this.start);
      return true;
    },
    render:function(progress,data){
      const end=data.end,shown=Math.round(end.length*progress);
      let text=end.slice(0,shown);
      for(let index=shown;index<end.length;index++)text+=end[index]===' '?' ':chars[(Math.random()*chars.length)|0];
      data.target.textContent=progress>=1?end:text;
    }
  };
})(window);
