angular.module('index', ['footerModule', 'siyfion.sfTypeahead'])
	.controller('indexController', function($scope, $http) {
	$scope.isLogin = false; // 判断是否登录
	
	$scope.selectedCuisine = null;
	// 获取cuisine
	$http.get('js/data/cuisine_area.json').success(function(data) {
		console.log(data);
		$scope.cuisines = data.cuisines;
	});
	
	// 获取所有餐厅的名称
	$scope.selectedName = null;
	
	// 搜索引擎对象
	var nameBlood = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace, // 对数据源进行切词的分词器
		queryTokenizer: Bloodhound.tokenizers.whitespace,// 对查询关键字进行切词的分词器
		prefetch: 'http://iservice.itshsxt.com/restaurant/load_all_names?callback=?' // 初始化原创数据的url
	});
	
	
	// datasets
	$scope.nameDataset = { // datasets
		source: nameBlood
	}
	
	$scope.search = function () {
		var data = {
			cuisine: $scope.selectedCuisine,
			searchKey: $scope.selectedName
		}
		sessionStorage.setItem("params", JSON.stringify(data));
		window.location.href = "list.html";
	}
	
})
