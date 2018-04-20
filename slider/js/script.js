var main=document.getElementById("main");
var pics=document.getElementById("banner").getElementsByTagName("div");
var timer=null;
var index=0;
var len=pics.length;
var dots=document.getElementById("dots").getElementsByTagName("span");
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var menuContent=document.getElementById("menu-content");
var menuItems=menuContent.getElementsByClassName("menu-item");
var subMenu=document.getElementById("sub-menu");
var innerBoxes=subMenu.getElementsByClassName("inner-box");





function slideImg(){
	//鼠标滑过 清除定时器
	main.onmouseover=function(){
		if(timer) clearInterval(timer);
	}
	//鼠标滑出 自动播放图片
	main.onmouseout=function(){
		timer=setInterval(function(){
			index++;
			if(index>=len) index=0;
			changeImg()
		},3000);
	}
	
	//自动在main上调动鼠标滑出的方法
	main.onmouseout();
	
	for(var d=0;d<len;d++){
		dots[d].id=d;
		dots[d].onclick=function(){
			index=this.id;
			changeImg();
		}
	}
	
	prev.onclick=function(){
		index--;
		if(index<0) index=len-1;
		changeImg();
	}
	
	next.onclick=function(){
		index++;
		if(index>=len) index=0;
		changeImg();
	}
	
	for(var m=0;m<menuItems.length;m++){
		menuItems[m].setAttribute("data-index",m);
		menuItems[m].onmouseover=function(){
			for(var j=0;j<menuItems.length;j++){
				innerBoxes[j].style.display="none";
				menuItems[j].style.background="none";
			}
			//下面这句话一定要有  不然innerboxes显示不出来
			subMenu.className="sub-menu";
			//获取当前对象的data-index属性  用this
			var idx=this.getAttribute("data-index");
			innerBoxes[idx].style.display="block";
			menuItems[idx].style.background="rgba(7,17,27,0.8)";
		}
	}
	menuContent.onmouseout=function(){
		subMenu.className="sub-menu hide";
		
	}
	subMenu.onmouseover=function(){
		this.className="sub-menu";	
	}
	
	subMenu.onmouseout=function(){
		this.className="sub-menu hide";	
	}
	
	
}



function changeImg(){
	for(var i=0;i<len;i++){
		pics[i].style.display="none";
		dots[i].className="";
	}
	pics[index].style.display="block";
	dots[index].className="active";
}

slideImg()