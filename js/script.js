var Host =  document.domain;
var baseUrl = (Host=='localhost') ? 'http://localhost:8080/mobileApps/mobileApp/':'http://pinkcityinfo.com/mobileApp/';
var menuLength;
var MenuLimit = 4;		// global set accrding to theme
var isMoreActive;	// global set according by user
var html;          // global set fot get data once call many times
var RssJsonTemp = [];
var argument1,argument2,argument3,argument4;
		// get licence
	function getLicenceData(){
			var stringData;
			var index;
			var id;
				$.get('licence.txt',function(data){
					var fileData = data.split('\n');
					$.each(fileData,function(i,item){
						 stringData =  item.split(':');
						$.each(stringData,function(j,str){
						if(str == 'userSiteId'){
						 index = j;
						 id = stringData[index+1]
						}
						})
						
					})
					//alert(id);
					$('#userSiteId').val(id);
					getUserAppereance();
					getMenuList();
				});
		}
		// get user appereance
	function getUserAppereance(){
			var userSite = $('#userSiteId').val();
			var url = baseUrl+'web/web/getUserApprence/'+userSite;
			var data = '';
			doAjaxCall(url,data,false,function(html){
			console.log(html);
			if($.isEmptyObject(html)){
					$('#main-content').html('Sorry we Do Not Find YourWebsite Appreance');
			}else{
				$.each(html, function(i,item){
					if(item.appBtnIconColor !=''){
						
					}
					if(item.appBtnTabBackground !=''){
						$('ul.Navigation_tabs li a').css({'background':'url('+baseUrl+item.appBtnTabBackground+')', 'background-size':'100% 100%'});
					}
					if(item.appBtnTabColor !=''){
						
					}if(item.appBtnTabTextColor !=''){
						
					}if(item.appGlobalAppFeatureButtonColor !=''){
						
					}if(item.appGlobalAppFeatureButtonTextColor !=''){
						
					}if(item.appGlobalAppFeatureTextColor !=''){
						
					}if(item.appGlobalAppNavBarColor !=''){
						
					}if(item.appGlobalAppNavShadowColor !=''){
						
					}if(item.appGlobalAppNavTextColor !=''){
						
					}if(item.appGlobalAppSectBarColor !=''){
						
					}if(item.appGlobalAppSectEvenRowBarColor !=''){
						
					}if(item.appGlobalAppSectEvenRowTextColor !=''){
						
					}if(item.appGlobalAppSectOddRowBarColor !=''){
						
					}if(item.appGlobalAppSectTextColor !=''){
						
					}if(item.appGlobalFont !=''){
						
					}if(item.appGlobalThemeColor !=''){
						
					}if(item.appHeaderColor !=''){
						
					}if(item.appHeaderGlobalColor !=''){
						
					}if(item.appHeaderGlobalImage !=''){
					$('.header-content').css('background','url('+baseUrl+item.appHeaderGlobalImage+')');
						
					}if(item.appHeaderImage !=''){
						
						
					}if(item.appLayoutColumns !=''){
						 MenuLimit = item.appLayoutColumns
						
					}if(item.appLayoutIsNavigation !='' ){
						isMoreActive = item.appLayoutIsNavigation;
					}if(item.appLayoutRow !=''){
						
					}
					if(item.menuStyle !=''){
						if(item.menuStyle ==1){
						var Class = 'bottom';
						}
						if(item.menuStyle ==2){
						var Class = 'top';
						}
						if(item.menuStyle ==3){
						var Class = 'left';
						}
						if(item.menuStyle ==4){
						var Class = 'right';
						}
						$('.Navigation').removeClass('bottom').addClass(Class);
						}
						
					if(item.mobileBackgroundAutoSwitchingMode !=''){
						
					}if(item.mobileBackgroundIsBuyerBoard !=''){
						
					}if(item.mobileBackgroundIsHomeScreen !=''){
						
					}if(item.mobileBackgroundIsLoyaltyTab !=''){
						
					}
				})
			}
			
			})
		}
			
		// getting user menu list
	function getMenuList(){
			var userSite = $('#userSiteId').val();
			//alert(userSite);
			var url = baseUrl+'web/web/getTabs/'+userSite;
			var data = '';
			//alert(url);
				// ajax calling
				doAjaxCall(url,data,false,function(html){
						console.log(html);
						if($.isEmptyObject(html)){
							$('#main-content').html('Sorry we Do Not Find YourWebsite');
						}else{
							menuLength = html.length;
							var menu ='';
							var menu2='';
							var primaryFlag;
							// append the menu
							$.each(html, function(i,item){
								if(i < MenuLimit || isMoreActive !=1){
									menu +='<li class="theme_1" onclick="menuData(this);"  featureRelId="'+item.featureRelId+'" featureId="'+item.featureId+'"  userSiteId="'+item.userSiteId+'" ><a href="javascript:" ><div class="icon_img"><img src="'+baseUrl+'assets/uploads/icons/'+item.image_name+'" width="30"/></div><span>'+item.featureName+'</span></a></li>';
								}else{
									primaryFlag=1;
									menu2 +='<li class="theme_1" onclick="menuData(this);"  featureRelId="'+item.featureRelId+'" featureId="'+item.featureId+'"  userSiteId="'+item.userSiteId+'" ><a href="javascript:" ><div class="icon_img"><img src="'+baseUrl+'assets/uploads/icons/'+item.image_name+'" width="30"/></div><span>'+item.featureName+'</span></a></li>';
								}
							});
							if(primaryFlag==1){
								menu +='<li class="more theme_1" onclick="dispalyMore();"><a href="#" >   <div class="icon_img"><img src="images/nav-icon.png" width="30"></div>More...</a></li>';
								$('.Navigation_tabs.primary').append(menu);
								menu2 +='<li class="back theme_1" onclick="showPrimaryMenu();"><a href="#" ><div class="icon_img"><img src="images/btnPrevious.png" width="30"/></div>Back</a></li>';
								$('.Navigation_tabs.hide').append(menu2);
									}else{
										$('.Navigation_tabs.primary').append(menu);
									}
							if(MenuLimit==3){ $('.Navigation_tabs').addClass('Col3'); }
							if(MenuLimit==4){ $('.Navigation_tabs').addClass('Col4'); }
						}
						
				});
		}	

		
		// get menu data 
	function menuData(obj){
	
				var featureRelId = $(obj).attr('featureRelId');
				var featureId = $(obj).attr('featureId');
				var menuhtml = $(obj).find('span').html();
				var userSiteId = $('#userSiteId').val();
				var backGroundColor;
				var textColor;
					
				$('#lastClick').val(featureRelId);
				var url = baseUrl+'web/web/getMenuHtml/'+featureId+'/'+featureRelId+'/'+userSiteId;
					var data = '';
								doAjaxCall(url,data,false,function(html){
									console.log(html);
									
									$('title,.header-content h1').html(menuhtml);
									if(featureId==1){
									homeTabInfo(html);
									}
									if(featureId==2){
									gallaryImageInfo(html);
									}
									if(featureId==3){
									geteventTab(html);
									}
									if(featureId==8){
									artistInfoTab(html);
									}
									if(featureId==9){
									infoTab1Info(html);
									}
									if(featureId==10){
									locationTab(html);
									}
									if(featureId==14){
									webSiteInfo(html);
									}
									if(featureId==16){
									youtubeTabInfo(html);
									}
									if(featureId==35){
									aboutUSInfo(html);
									}
									if(featureId==38){
									NewsletterInfo(html);
									}
									if(featureId==39){
									menuTabInfo(html);
									}
									if(featureId==43){
									RssTabInfo(html);
								
									}
									if(featureId==44){
									sportTabInfo(html);
									}
									if(featureId==52){
									infoTab3Info(html);
									}
								});
		}

		/******************************/
		/*		ABOUT US INFO		  */
		/******************************/
	function aboutUSInfo(html){
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
		var backGroundColor,textColor;
		var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
			$.each(html,function(i,item){
					if(item.parentId == 0 ){
					data +='<li data-role="list-divider">'+item.section+'</li>';
					data +='<li onclick="getAboutData('+item.itemId+',this)"><a href="javascript:" >'+item.name+'</a></li>';
					$.each(html,function(i,innerItem){
						if(item.itemId == innerItem.parentId){
							//alert('child'+innerItem.itemId);
						data +='<li onclick="getAboutData('+item.itemId+',this)"><a href="javascript:">'+innerItem.name+'</a></li>';
						}
					})
					}
					backGroundColor  = item.globalBackground;
					textColor		 = item.globalTextColor;
					$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
				})
			data +='</ul>';	
			$('#main-content').html(data);
			try {
          $("#aboutclass").listview('refresh');
      } catch (e) {
          $("#aboutclass").listview();
      }
			
			}
	}
	// get description for about us
	function getAboutData(itemId,btn){
		
		var menuhtml = $(btn).find('a').html();
		var userSiteId = $('#userSiteId').val();
		var url = baseUrl+'web/web/getAboutUsDescription/'+itemId;
		var data = '';
								doAjaxCall(url,data,false,function(html){
									console.log(html);
									$('title,.header-content h1').html(menuhtml);
									$('.header-content .back').show();
									$('#main-content').html(html[0].description);
								});
	}
	
		/******************************/
		/*		END ABOUT US INFO	  */
		/******************************/
		
		/******************************/
		/*		WEBSITE  INFO		  */
		/******************************/
	function webSiteInfo(html){
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
		
		var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
			$.each(html,function(i,item){
			data +='<li data-role="list-divider" src="'+item.url+'" onclick="openWebsite(this)"><a href="javascript:" class="ui-link-inherit">'+item.name+' </a></li>';
			})
			data +='</ul>';
			$('#main-content').html(data);
			
			try {
				  $("#aboutclass").listview('refresh');
				}catch (e){
				  $("#aboutclass").listview();
			  }
		}
	}
	 function openWebsite(btn){
		var menuhtml = $(btn).find('a').html();
		var src = $(btn).attr('src');
		var data = '<iframe src="'+src+'" frameborder="0" height="100%" width="100%" scrolling="yes" allowtransparency="yes">';
		data += '<iframe>';
		$('title,.header-content h1').html(menuhtml);
		$('.header-content .back').show();
		$('#main-content').html(data);
	 }
	
		/****************************/
		/*	END	WEBSITE  INFO		*/
		/****************************/
		
		/****************************/
		/*	 START INFO TAB 1		*/
		/****************************/
	function infoTab1Info(html){
		if($.isEmptyObject(html)){
				$('#main-content').html('Sorry we have an info Tab data');
			}else{
			var backGroundColor,textColor,description;
			$.each(html,function(i,item){
			backGroundColor  = item.globalBackground;
			textColor		 = item.globalTextColor;
			description		 = item.description;
			})
			if(description==''){
			$('#main-content').html('Sorry We Have An Empty Data');
			}else{
			$('#main-content').html(description);
			}
			$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
			}
		
	}	
	
		/******************************/
		/*	  INFO TAB 2			  */
		/*****************************/
		
		
		
		/******************************/
		/*	 START INFO TAB 3	      */
		/******************************/
	
	function infoTab3Info(html){
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
		var backGroundColor,textColor;
		var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
			$.each(html,function(i,item){
					data +='<li data-role="list-divider">'+item.catSection+'</li>';
					data +='<li onclick="getInfo3Data('+item.categoryId+','+item.info3id+',this)"><a href="javascript:" >'+item.catName+'</a></li>';
					backGroundColor  = item.globalBackground;
					textColor		 = item.globalTextColor;
					$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
				});
			data +='</ul>';	
			$('#main-content').html(data);
			try {
          $("#aboutclass").listview('refresh');
      } catch (e) {
          $("#aboutclass").listview();
      }
			
			}
	}
		
	function getInfo3Data(categoryId,infoId,btn){
			
			var menuhtml = $(btn).find('a').html();
			var userSiteId = $('#userSiteId').val();
			var url = baseUrl+'web/web/getInfotabList/'+categoryId+'/'+infoId;
			var data = '';
				doAjaxCall(url,data,false,function(html){
					console.log(html);
					var backGroundColor,textColor;
					var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
						$.each(html,function(i,item){
								if(item.parentId == 0 ){
								data +='<li data-role="list-divider">'+item.section+'</li>';
								data +='<li onclick="getInfo3Desc('+item.itemId+',this)"><a href="javascript:" >'+item.name+'</a></li>';
								$.each(html,function(i,innerItem){
									if(item.itemId == innerItem.parentId){
										//alert('child'+innerItem.itemId);
									data +='<li onclick="getInfo3Desc('+item.itemId+',this)"><a href="javascript:">'+innerItem.name+'</a></li>';
									}
								})
								}
								backGroundColor  = item.globalBackground;
								textColor		 = item.globalTextColor;
								$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
							})
						data +='</ul>';
							$('title,.header-content h1').html(menuhtml);
							$('.header-content .back').show();						
							$('#main-content').html(data);
						try {
					  $("#aboutclass").listview('refresh');
				  } catch (e) {
					  $("#aboutclass").listview();
				  }
			});
	}
	function getInfo3Desc(itemId,btn){
		var menuhtml = $(btn).find('a').html();
		var userSiteId = $('#userSiteId').val();
		var url = baseUrl+'web/web/getinfo3Description/'+itemId+'/'+userSiteId;
		var data = '';
								doAjaxCall(url,data,false,function(html){
									console.log(html);
									$('title,.header-content h1').html(menuhtml);
									$('#main-content').html(html[0].Description);
									
								});
	}
	
	
		/******************************/
		/*	 END INFO TAB 3	     	 */
		/******************************/
		
		/******************************/
		/*	 START MENU TAB		      */
		/******************************/
	
	function menuTabInfo(html){
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
			
			var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
			$.each(html,function(i,item){
					if(item.parentId == 0 ){
					data +='<li data-role="list-divider">'+item.section+'</li>';
					data +='<li onclick="getMenuDesc('+item.menuId+',this)"><a href="javascript:" >'+item.name+'<p class="ui-li-aside"><strong>'+item.price+'</strong></p></a></li>';
					$.each(html,function(i,innerItem){
						if(item.menuId == innerItem.parentId){
							//alert('child'+innerItem.itemId);
						data +='<li onclick="getMenuDesc('+item.menuId+',this)"><a href="javascript:">'+innerItem.name+'<p class="ui-li-aside"><strong>'+item.price+'</strong></p></a></li>';
						}
					})
					}
					
				})
			data +='</ul>';	
			$('#main-content').html(data);
					try {
					$("#aboutclass").listview('refresh');
					  } catch (e) {
						  $("#aboutclass").listview();
					  }
			
			}
	}
	
	function getMenuDesc(menuId,btn){
		var backGroundColor,textColor;
			var menuhtml = $(btn).find('a').text();
			var userSiteId = $('#userSiteId').val();
			var url = baseUrl+'web/web/getMenuDescription/'+menuId+'/'+userSiteId;
			var data = '';
					doAjaxCall(url,data,false,function(html){
							console.log(html);
							$('title,.header-content h1').html(menuhtml);
							$('#main-content').html(html[0].description);
							backGroundColor  = html[0].globalBackground;
							textColor		 = html[0].globalTextColor;
							$('.header-content .back').show();	
							$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
							});
	}
		/******************************/
		/*	 END MENU TAB		      */
		/******************************/
		
		
		/******************************/
		/*	 Start Artist info 		  */
		/******************************/
	function artistInfoTab(html){
			if($.isEmptyObject(html)){
				$('#main-content').html('Sorry we have an info Tab data');
			}else{
			var backGroundColor,textColor,description;
			$.each(html,function(i,item){
			backGroundColor  = item.globalBackground;
			textColor		 = item.globalTextColor;
			description		 = item.description;
			})
			if(description==''){
			$('#main-content').html('Sorry We Have An Empty Data');
			}else{
			$('#main-content').html(description);
			}
			$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
			}
	}
	
	/******************************/
	/*	 Start LOCATION TAB       */
	/******************************/
	var locationTemp;
	function locationTab(html){
			if($.isEmptyObject(html)){
				$('#main-content').html('Sorry we have an info Tab data');
			}else{
			locationTemp = html;
				var backGroundColor,textColor;
					var count =1;
					var data;
					var firstHomeId = html[0].homeId;
						//alert(firstHomeId);
					$.each(html,function(i,item){
						if(item.homeId != firstHomeId){
						count++;
						}
					});
					if(count == 1){
						//alert('heere');
						$.each(html,function(i,item){
								if(i == 0){
								data +='<h3 class="align-center">'+ item.city +'</h3>';
								data +='<a href="#" data-role="button">View Map</a>';
								data +='<a href="tel:'+item.telephone+'" data-role="button">Call Us</a>';
								data +='<a href="javascript:" site="'+item.website+'" data-role="button" onclick="openIframe(this)">View Website</a>';
								data +='<a href="mailto:'+item.email+'" data-role="button">View Email Us</a>';
								data +='<p><strong>Opening Hours</strong></p>';
								$.each(html,function(i,item){
								data += '<fieldset class="ui-grid-a"><div class="ui-block-a">'+item.day+'</div><div class="ui-block-b">'+item.openFrom+' to '+item.openTo+'</div></fieldset>';
								})
								
							}	
							});
						$('#main-content').html(data);
						$('#main-content').trigger('create');
						
					}else{
						var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
						var homeArray =[];
						$.each(html,function(i,item){
							if($.inArray(item.homeId,homeArray) == -1)
							{
							homeArray[i] = item.homeId;
							data +='<li onclick="getLocationInfo('+item.homeId+',this)"><a href="javascript:" >'+item.city+'</a></li>';
							}
							
						})
						data +='</ul>';	
							
						$('#main-content').html(data);
						try {
						$("#aboutclass").listview('refresh');
						  } catch (e) {
							  $("#aboutclass").listview();
						  }
					}
		
			}
	}
	
	
	function getLocationInfo(homeId,btn){
		var data='';
			$.each(locationTemp,function(i,item){
								if(homeId == item.homeId){
								data +='<h3 class="align-center">'+ item.city +'</h3>';
								data +='<a href="#" data-role="button">View Map</a>';
								data +='<a href="tel:'+item.telephone+'" data-role="button">Call Us</a>';
								data +='<a href="javascript:" site="'+item.website+'" data-role="button" onclick="openIframe(this)">View Website</a>';
								data +='<a href="mailto:'+item.email+'" data-role="button">View Email Us</a>';
								data +='<p><strong>Opening Hours</strong></p>';
								$.each(locationTemp,function(i,item){
								if(homeId == item.homeId){
								data += '<fieldset class="ui-grid-a"><div class="ui-block-a">'+item.day+'</div><div class="ui-block-b">'+item.openFrom+' to '+item.openTo+'</div></fieldset>';
								}})
								}	
							});
							//alert(data);
						$('#main-content').html(data);
						$('#main-content').trigger('create');
	}
	function openIframe(btn){
		var menuhtml = $(btn).html();
		var src = $(btn).attr('site');
		var data = '<iframe src="'+src+'" frameborder="0" height="100%" width="100%" scrolling="yes" allowtransparency="yes">';
		data += '<iframe>';
		$('title,.header-content h1').html(menuhtml);
		$('.header-content .back').show();
		$('#main-content').html(data);
	 }
	
	function homeTabInfo(html){
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
				var popdata='';
				var data = '<div class="TopBar"><ul id="headerHome">';
				$.each(html,function(i,item){
							if(i==0){
							if(item.callButton==1){
							data +='<li><a href="#popcallus"  data-position-to="window" data-inline="true" data-rel="popup" >Call Us</a> </li>';
							}
							if(item.directionButton==1){
							data +='<li><a href="#popdirections"  data-position-to="window" data-inline="true" data-rel="popup" >Directions</a> </li>';
							}
							if(item.tellFriend==1){
							data +='<li><a href="#popshare"  data-position-to="window" data-inline="true" data-rel="popup" >Tell Friend</a> </li>';
							}
						}});
				data +='</ul></div>';

				popdata += '<div data-role="popup" id="popcallus" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Call Us</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Which location would you like to call?</h3>';
						$.each(html,function(i,item){
					 popdata +='<a href="tel:'+item.telephone+'" data-role="button" data-theme="b">'+item.city+', '+item.telephone+' </a>';
					});
					  popdata +='</div></div>';



					  popdata += '<div data-role="popup" id="popdirections" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div <div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Directions</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Which location would you like to call?</h3>';
						$.each(html,function(i,item){
					 popdata +='<a href="tel:'+item.telephone+'" data-role="button" data-theme="b">'+item.city+', '+item.telephone+' </a>';
					});
					  popdata +='</div> </div>';


					  popdata += '<div data-role="popup" id="popshare" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div <div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Tell Friend</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Which location would you like to call?</h3>';
						$.each(html,function(i,item){
					 popdata +='<a href="mailto:'+item.email+'" data-role="button" data-theme="b">Share by Email</a>';
					});
					  popdata +='</div> </div>';	
					$('.header-content').html(data);
					$('#main-content').html(popdata);
					$('div[data-role="popup"]').trigger('create');
					$('div[data-role="popup"]').popup();
					try {
						$('.header-content').trigger('create');
					  //$("#headerHome").listview('refresh');
				  } catch (e) {
					$('.header-content').page();
					 // $("#headerHome").listview();
				  }			
		
		}
		
		}
			
		var youtubeTemp;	
	function youtubeTabInfo(html)
	{
			if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an info Tab data');
			}else{
			var data='';
			youtubeTemp = html;
			$.each(html,function(i,item){
			data += '<div class="youtube align-center" onclick="showYouTubeVideo(this);" videoId="'+item.videoId+'"><a href="javascript:"><img src="http://img.youtube.com/vi/'+item.videoId+'/1.jpg" width="320" height="200" /></a><br><div style="text-overflow:ellipsis;white-space: nowrap; overflow: hidden; text-align:center !important;"><strong>'+item.title+'</strong></div></div>';
			})
			$('#main-content').html(data);
			$('#main-content').trigger('create');

			}
		}

	function showYouTubeVideo(btn){
		videoId = $(btn).attr('videoId');
		
		var data='';
			data += '<iframe width="100%" height="200" src="http://www.youtube.com/embed/'+videoId+'" frameborder="0" allowfullscreen></iframe>';
			$('.header-content .back').show();
			$('#main-content').html(data);
			$('#main-content').trigger('create');
	}
		
	function sportTabInfo(html){
			if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an info Tab data');
			}else{
				var data =' <div class="Sports"><table data-role="table" id="" data-mode="" class="ui-responsive "><tbody>';
				var sportsEmail;	
				var sportsMessage;	
          
				$.each(html,function(i,item){
					sportsEmail = item.sendTo;
					sportsMessage = item.message;
					data +='<tr id="'+item.sportsStartsTabId+'"><td class="stateVal"> '+item.statName+' <input type="hidden"  class="sportRate" name="sportRate" value="1"/></td><td class="statevalchange"> 1 </td><td><div class="inc button increment">+</div></td><td><div class="dec button decrement">-</div></td></tr>';
				});
				 data +='</tbody></table></div><a href="mailto:'+sportsEmail+'?body='+sportsMessage+'" data-theme="b" data-role="button" id="submitSportsButton">Email Results</a>';
				$('#main-content').html(data);
				
				$('.Sports .increment').click(function(){
					var currentRate = $(this).closest('tr').find('.sportRate').val();
						
						currentRate = parseInt(currentRate)+1;
						$(this).closest('tr').find('.statevalchange').html(currentRate);
						$(this).closest('tr').find('.sportRate').val(currentRate)
				});
				$('.Sports .decrement').click(function(){
					var currentRate = $(this).closest('tr').find('.sportRate').val();
						currentRate = parseInt(currentRate)-1;
						$(this).closest('tr').find('.statevalchange').html(currentRate);
						$(this).closest('tr').find('.sportRate').val(currentRate)
				});
				
				$('#main-content').trigger('create');
			}
	}	
	
	 var eventJsonTemp='';
	function geteventTab(html){
			//alert('fdsaf');
		if($.isEmptyObject(html)){
				$('#main-content').html('Sorry we have an info Tab data');
			}else{
			var data='';
			 data='<link rel="stylesheet" type="text/css" href="css/jquery.mobile-1.3.1_mobilePrev.css">';
			
			data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
			var month='';
			var error='';
			eventJsonTemp = html;
			$.each(html,function(i,item){
			
			if(month!=item.month){
			month=item.month;
			data += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-first-child">'+item.month+' '+item.year+'</li>';
			}
			data +='<li  class="oddbg" style=""><a href="javascript:" onclick="eventDescription('+item.eventId+',this);" ><img src="images/Event_icon.png" alt=""><h3>'+item.name+'</h3><span class="ui-li-month">'+item.month+'</span><span class="ui-li-day">'+item.date+'</span></a></li>';
			if(item.error!=''){
			
				 error = item.error;
			}
			});
			data += '</ul>';
			}
			$('#main-content').html(data);
			if(error){
				$('#main-content').html(error);
			}
			try {
						$("#aboutclass").listview('refresh');
						  } catch (e) {
							  $("#aboutclass").listview();
						  }
			}
		
		function eventDescription(eventId,btn){
			$.each(eventJsonTemp,function(i,item){
			
			if(eventId == item.eventId){
			backGroundColor  = item.globalBackground;
			textColor		 = item.globalTextColor;
			description		 = item.description;
			name		 = item.name;
			if(description==''){
			$('#main-content').html('Sorry We Have An Empty Data');
			}else{
			$('.ui-title').html(name);
			$('#main-content').html(description);
			}
			$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
			}
			})
			
		}
	
	var gallaryTemp='';
	function gallaryImageInfo(html){
			if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an info Tab data');
				}else{
					var data='';
					gallaryTemp =html;
					data += '<ul id="Gallery" class="gallery">';
					$.each(html,function(i,item){
					
					data += '<li id="'+item.imageId+'"> <a href="'+baseUrl+item.imageName+'"><img src="'+baseUrl+item.imageName+'" alt="Gallary" /></a></li>';
						})
					data +='</ul>';	
					$('#main-content').html(data);
						try {
						 $("#main-content").listview('refresh');
							}catch (e) {
						  $("#main-content").listview();
						}
					$("#Gallery a").photoSwipe({ enableMouseWheel: true , enableKeyboard: true });
				}
	}	
/*	function viewGallryImage(btn){
			var viewId = $(btn).attr('id');
			var src = $(btn).find('img').attr('src');
			//alert(viewId);
			var data='';
			data += '<ul id="Gallery" class="gallery">';
			data += '<li id="'+viewId+'"><a href="javascript:"><img src="'+src+'" alt="Please Wait...." /></a></li>';
			$.each(gallaryTemp,function(i,item){
					if(item.imageId != viewId){
					data += '<li id="'+item.imageId+'"> <a href="javascript:"><img src="'+baseUrl+item.imageName+'" alt="Please Wait" /></a></li>';
					}
						})
			data +='</ul>';	
			


					$('#main-content').html(data);
						try {
						 $("#main-content").listview('refresh');
							}catch (e) {
						  $("#main-content").listview();
						}
						
						
						
	}*/
	
	
		

		 function RssTabInfo(html){
			//alert('fdsaf');
		if($.isEmptyObject(html)){
				$('#main-content').html('Sorry we have an Podcast Tab data');
			}else{
			var data='';
			// data='<link rel="stylesheet" type="text/css" href="css/jquery.mobile-1.3.1_mobilePrev.css">';
			
			data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="Rssclass">';
			var date='';
			var error='';
			var image='';
			$.each(html,function(i,item){
			
			if(date!=item.date){
			date=item.date;
			data += '<li   data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-first-child">'+item.date+'</li>';
			}
			if(item.RssIcon){
			image=item.RssIcon;
			}else{
			image='assets/images/rss.png';
			}
			data +='<li id="'+i+'" rel="'+item.title+'" url="'+item.link+'" class="oddbg" style=""><a href="javascript:" onclick="RssDescription('+i+',this);" ><img src="'+baseUrl+image+'" alt=""><h3>'+item.title+'</h3></a></li>';
			
			
			RssJsonTemp[i]		 = item.description;
			if(item.error!=''){
			
				 error = item.error;
			}
			
			});
			data += '</ul>';
			}
			$('#main-content').html(data);
			if(error){
				$('#main-content').html(error);
			}
			try {
						$("#Rssclass").listview('refresh');
						  } catch (e) {
							  $("#Rssclass").listview();
						  }
			}
		
		function RssDescription(id,btn){
		//alert('hi');
		var RssDescriptionid=$(btn).closest('li').attr('id'); 
		var RssDescriptionrel=$(btn).closest('li').attr('rel'); 
		var RssDescriptionlink=$(btn).closest('li').attr('url'); 
			$.each(RssJsonTemp,function(i,item){
			
			if(RssDescriptionid == i){
			backGroundColor  = item.globalBackground;
			textColor		 = item.globalTextColor;
			description		 = RssJsonTemp[i];
			title		 = RssDescriptionrel;
			description +='<a href="javascript:" rel="'+RssDescriptionlink+'" onclick="readmeRss(this);" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" ><span class="ui-btn-inner"><span class="ui-btn-text">Read Article</span></span></a>';
			if(description==''){
			$('#main-content').html('Sorry We Have An Empty Data');
			}else{
			$('.ui-title').html(title);
			$('#main-content').html(description);
			}
			$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
			}
			})
			
		}function readmeRss(btn){
				var RssDescriptionrel=$(btn).closest('a').attr('rel'); 
		var	description ='<iframe src="'+RssDescriptionrel+'" frameborder="0" height="100%" width="100%" scrolling="yes" allowtransparency="yes">';
			description +='<iframe>';
		
			if(description==''){
			$('#main-content').html('Sorry We Have An Empty Data');
			}else{
			$('.ui-title').html(title);
			$('#main-content').html(description);
			}
			$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
		}
		function NewsletterInfo(html){
			if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an info Tab data');
			}else{
				var data ='<h3 class="align-center">Sign up for our newsletter</h3><label for="name">Name</label><input type="text" id="name" ><label for="email">email</label><input type="email" id="email" ><br>';
				
				$.each(html,function(i,item){
				data +='<label for="slider'+item.categoryId+'">'+item.categoryName+'</label><select name="slider'+item.categoryId+'" id="slider'+item.categoryId+'" data-role="slider" data-mini="true"><option class="ui-btn-up-b" value="off">No</option><option class="ui-btn-up-b" value="on">Yes</option></select>';
				});
				var newsletterEmail;	
				var newsletterMessage;	
				 data +='<div class="sendNewsletterdetails"><input type="submit" value="Join"></div>';
				$('#main-content').html(data);
				$('#main-content').trigger('create');

				$('.sendNewsletterdetails').click(function(){
		
				var name =	$('#name').val();
				var email =	$('#email').val();
				 email= email.replace('@','-');
				var url =baseUrl+'web/web/newsletterentry/'+name+'/'+email+'/';
				data = '{"employees": [';
				var more = '';
				var categoryvalue = '';
				$.each(html,function(i,item){
				
				if(more==1){
				data +=',';
				}
				categoryvalue=$('#slider'+item.categoryId).val();
				data += '{ "categoryId":"'+item.categoryId+'" , "value":"'+categoryvalue+'" }';
				more=1;
				
				});
				
				data +=']}';
			   data = $.parseJSON(data);
			//	data = {"employees": [{ "ram":"asdfasdf" , "value":"fdasf" },{ "ramasd":"asdfasdasdf" , "valasdue":"fasddasf" }]};
				doAjaxCall(url,data,true,function(html){
					if(html==1){
						alert('data submited');
					}else{
						alert('some error occured');
							}
				});	
				
				});
				
			}
			}
		
		/******************************/
		/*							*/	
		/*	GLOBAL FUNCTIONS		*/
		/***************************/
		
		
		
		
				// get values form query string
	function getUrlVars(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
				{
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
			return vars;
		}
	function goBackSteps(){
		if($('#BackSteps').val() == 1){
			$('ul.Navigation_tabs li[featurerelid="'+$('#lastClick').val()+'"]').click();
		}
	
	
	}	
		// toggle more
	function dispalyMore(){
			$('.Navigation .Navigation_tabs.primary').hide('slow');
				$('.Navigation').find('.toggle_display').show('slow');
			}
	function showPrimaryMenu(){
			$('.Navigation').find('.toggle_display').hide('slow');
			$('.Navigation .Navigation_tabs.primary').show('slow');
		}	
		
		
			// ajax calling function
	function doAjaxCall(url,data,showLoading,callback){
			if (showLoading){
				$('.loadingDiv').show();
				}	
			 $.ajax({
			 url: url,
			 type: "POST",
			 data: data,
			 dataType: "json",
			 cache: false,
			 success: function(html){
										 callback(html);
										if (showLoading){
															$('.loadingDiv').hide();
														}
									}
						});
		} 
		
		/********************************/
		/*								*/	
		/*	END GLOBAL FUNCTIONS		*/
		/********************************/