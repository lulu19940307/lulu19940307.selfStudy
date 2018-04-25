
//页面的脚本逻辑
//以下代码先出11 再出10
//原因 等页面完全加载完成后才跳出10
//$(function(){
//	alert(10);
//})
//alert(11);


//ui-search定义
$.fn.UiSearch=function(){
	var ui=$(this);
	
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;//为了防止时间往上冒泡，一层一层网上走
	});
	$('.ui-search-select-list a',ui).on('click',function(){
		$('.ui-search-selected').text($(this).text());//文本替换为当前的文本
		$('.ui-search-select-list').hide();
		return false;
	})
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	})
}
//ui-tab 定规
/*
 * @param{string} header Tab组件的所有选项卡 item
 * @param{string} content Tab组件，内容区域，所有item
 * @param{string} focus_prefix 选项卡高亮样式前缀，可选
 * 城区的选项卡的样式在block-caption-item_focus
 * 
 */
$.fn.UiTab=function(header,content,focus_prefix){
	var ui=$(this);
	var tabs=$(header,ui);
	var cons=$(content,ui);
	var focus_prefix=focus_prefix||"";
	
	tabs.on("click",function(){
		var index=$(this).index();
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
		cons.hide().eq(index).show();
		return false;
	})
}
//ui-backtop
$.fn.UiBackTop = function(){
	var ui=$(this);
	var el=$('<a class="ui-backTop" href="#0"></a>');	
	ui.append(el);
	
	var windowHeight=$(window).height();
	console.log(windowHeight);
	$(window).on('scroll',function(){
		var top=$('body').scrollTop();
        console.log(top);
		if(top > windowHeight){
			el.show();
		}else{
			el.hide();
		}
	});
	el.on('click',function(){
		$(window).scrollTop(0);
	});
}
//ui-slider

//1.左右箭头需要能控制翻页
//2.翻页的时候，进度点要联动进行focus
//3.翻到第三页的时候，下一页需要回到第一页;翻到第一页的时候同理
//4.进度点在点击的时候，需要切换到对应的页面
//5.没有（进度点点击、翻页操作）的时候需要进行自动滚动
//6.滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）
//7.高级无缝滚动
$.fn.UiSlider=function(){
	var ui=$(this);
	
	var wrap=$('.ui-slider-wrap');
	
	var btn_prev=$('.ui-slider-arrow .left',ui);
	var btn_next=$('.ui-slider-arrow .right',ui);
	
	var items=$('.ui-slider-wrap .item',ui);
	var tips=$('.ui-slider-process .item',ui);
	//预定义
	var current=0;
	var size=items.size();
	var width=items.eq(0).width();
	var enableAuto=true;
	
	//设置自动滚动感应（如果鼠标在wrap中，不要自动滚动）
	ui.on('mouseover',function(){
		enableAuto=false;
	})
	ui.on('mouseout',function(){
		enableAuto=true;
	})
	//具体操作
	wrap.on('move_prev',function(){
		if(current<=0){
			current=size;
		}
		current=current-1;
		wrap.triggerHandler('move_to',current);
	});
	wrap.on('move_next',function(){
		if(current>=size-1){
			current = -1;
		}
		current=current+1;
		wrap.triggerHandler('move_to',current);
	});
	wrap.on('move_to',function(evt,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	});
	wrap.on('auto_move',function(){
		setInterval(function(){
			enableAuto&&wrap.triggerHandler('move_next');
		},2000);
	})
	wrap.triggerHandler('auto_move');
	
	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index=$(this).index();
		wrap.triggerHandler('move_to',index);
	});
}

//页面的脚本逻辑
$(function(){
	$('.ui-search').UiSearch();
	$('.content-tab').UiTab('.caption>.item','.block>.item');
	$('.content-tab .block ,item').UiTab('.block-caption>a','.block-content>.block-wrap','block-caption-');
	$('body').UiBackTop();
	$('.ui-slider').UiSlider();
})
