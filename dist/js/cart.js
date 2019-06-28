var Token = location.search.split("=")[1];
if(Token!=undefined){//基本在前面都拦截了  没有token是进不来购物车的
	var user=JSON.parse(localStorage.getItem(Token));	
	$("#ydl").text("欢迎"+user).click(function(){
		alert("您已登录")
		$(this).attr("href","#")        
	});
	$(".login-before").hide();
}
$("#goplist").click(function(){
	window.location.href = 'index.html?token=' + Token, "self";
})
$(".c-logo").click(function(){
	window.location.href = 'index.html?token=' + Token, "self";
})

class Cart {
	constructor(data) {
		this.data = data;
	}
	//更新购物车数据
	updata(uid, ugid, unum) {
		$.get("http://47.104.244.134:8080/cartupdate.do", { id: uid, gid: ugid, num: unum, token: Token })
			.done((data) => {
				console.log(data)
			})
	}
	show(objid, allid) {
		this.oul = document.getElementById(objid);
		var str = "";
		for (let i = 0; i < this.data.length; i++) {
			var url=this.data[i].goods.picurl;
				if(url==""){
					url="../imgs/16.jpg";
				}
			str += `				
		<li >
		    <input type="checkbox" class="chk" checked="checked">        
			<a href="detial.html?id=${this.data[i].goods.gid}&token=${Token}"><img src='${url}'></a>					
			<p class="title">${this.data[i].goods.name}<br>单价：<span class="dj">${this.data[i].goods.price}</span></p>
			
			<p class="js">
            
            <span class="jian">-</span>
		 	<input type="text" value="${this.data[i].count}" class="num" data-id="${this.data[i].id}" data-gid="${this.data[i].gid}">
			<span class="jia">+</span>	
			 </p>						
            <span class="jg">${this.data[i].goods.price * this.data[i].count}</span>
            <span class="del" data-id="${this.data[i].id}" data-gid="${this.data[i].gid}">删除该商品</span>
        </li>`;
		}
		this.oul.innerHTML = str;
		this.ali = document.getElementsByTagName("li")
		this.ajian = document.getElementsByClassName("jian")
		this.ajia = document.getElementsByClassName("jia")
		this.anum = document.getElementsByClassName("num")
		this.ajg = document.getElementsByClassName("jg")
		this.adelbtn = document.getElementsByClassName("del")
		this.achk = document.getElementsByClassName("chk")
		this.zj = document.getElementById("zj")
		this.all = document.getElementById(allid);
		this.all.checked = true;
		this.nnn()
		this.all.onclick = () => {
			if (this.all.checked) {
				for (let j = 0; j < this.achk.length; j++) {
					this.achk[j].checked = true
					//this.achk[j].setAttribute("checked","true")
				}
			} else {
				for (let k = 0; k < this.achk.length; k++) {
					this.achk[k].checked = false;
					//this.achk[j].removeAttribute("checked")
					//this.achk[j].setAttribute("checked","false")
				}
			}
			this.getzj();
			this.nnn()
		}
		var _this = this;
		for (let i = 0; i < this.ajian.length; i++) {

			this.ajia[i].onclick = () => {
				this.anum[i].value = parseInt(this.anum[i].value) + 1;
				var id = this.anum[i].getAttribute("data-id");
				var gid = this.anum[i].getAttribute("data-gid");
				this.updata(id, gid, 1);
				this.getzj();
				this.nnn()
			}
			this.ajian[i].onclick = () => {
				var id = this.anum[i].getAttribute("data-id");
				var gid = this.anum[i].getAttribute("data-gid");
				this.anum[i].value -= 1;
				if (this.anum[i].value <= 1) {
					this.anum[i].value = 1
				}
				this.updata(id, gid, -1);
				this.getzj();
				this.nnn()
			}
			this.anum[i].onchange = () => {
				if (this.anum[i].value <= 1) {
					this.anum[i].value = 1
				}
				var id = this.anum[i].getAttribute("data-id");
				var gid = this.anum[i].getAttribute("data-gid");
				this.updata(id, gid, 0);
				this.updata(id, gid, this.anum[i].value);
				this.getzj();
				this.nnn()
			}
			//存this的方法
			this.adelbtn[i].onclick = function () {
				console.log(this, _this)//_this存的是对象实例
				var id = this.getAttribute("data-id");
				var gid = this.getAttribute("data-gid");
				_this.oul.removeChild(this.parentNode);
				delete _this.data[id]
				_this.updata(id, gid, 0);
				_this.getzj();
				_this.nnn()
			}
			//委托
			//			this.ali[i].onclick = (e) => {
			//				var evt = e || event;
			//				var _target = evt.target || evt.srcElement;
			//				if(_target.className==="del") {
			//					var id=_target.getAttribute("data-id");
			//					this.oul.removeChild(_target.parentNode)
			//					delete this.data[id]
			//					setCookie("cart", JSON.stringify(this.data))										
			//					this.getzj();
			//				}
			//			}
			this.achk[i].onclick = () => {
				this.getzj();
				//this.nnn()
			}

		}

	}
	getzj() {
		var total = 0;
		this.adj = document.getElementsByClassName("dj")
		for (let i = 0; i < this.ajg.length; i++) {
			this.ajg[i].innerText = this.anum[i].value * this.adj[i].innerText
		}
		var flag = true;
		for (let i = 0; i < this.achk.length; i++) {
			if (this.achk[i].checked) {
				total += parseInt(this.ajg[i].innerText)
			} else {
				flag = false;
			}
		}
		this.all.checked = flag;
		this.zj.innerText ="总计："+ total;
	}
	nnn() {//最下面的总价是否显示
		var s = this.oul.children;
		if (s.length == 0) {
			this.zj.style.display = "none";
			this.all.checked = false;
		}
	}
}