$(document).ready(function () {
  //change header navber sun and moon
  $(".slider").on("click ", function () {
    if ($(this).hasClass("sun")) {
      $(".sun").css({
        display: "none",
      });
      $(".moon").css({
        display: "block",
      });
    } else {
      $(".sun").css({
        display: "block",
      });
      $(".moon").css({
        display: "none",
      });
    }
  });
  //top-screen-button
  function blkTopScrBtn(elem) {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20 ||
      elem > 20
    ) {
      $("#topScreenBtn").css("display", "block");
    } else {
      $("#topScreenBtn").css("display", "none");
    }
  }
  function screenTop() {
    let [productScreen, elem] = document.getElementsByClassName("info");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    productScreen.scrollTop = 0;
  }
  $(".info").on("scroll", function (e) {
    blkTopScrBtn(this.scrollTop);
  });
  $(window).on("scroll", function () {
    blkTopScrBtn();
  });
  $("#topScreenBtn").click(function () {
    screenTop();
  });
  //req herder select & herder select display block
  $('input[name="search"]').on("keyup", function () {
    //herder select display block
    $("#search-result").css("display", "block");
    //req herder select
    $.ajax({
      type: "get",
      url: "/search",
      data: {
        search: $(this).val(),
      },
      success: async function (response) {
        var values = {};
        for (index in response) {
          values[index] = response[index].prod;
        }
        let result = ``;
        for (let i = Object.values(values).length - 1; i >= 0; i--) {
          result += `<li><a href="/${values[i]}">${values[i]}</a></li>`;
        }
        result == ""
          ? (result = "<li><a href='/'>搜尋無結果</a></li>")
          : (result = result);
        await $("#search-result>ul").html(result);
      },
    });
  });
  $("body").on("click", function () {
    $("#search-result").css("display", "none");
  });
  //req brand product
  $(".brand>a").on("click", function () {
    console.log();
    $.ajax({
      type: "get",
      url: "/product/",
      data: {
        brand: $(this).attr("value"),
      },
      success: async function (response) {
        await $(".productBox").remove();
        await $(".contral-product-page").remove();
        await $(".productSlecet").after(`${response}`);
      },
    });
  });
  //req addTime product & addTime product button change img
  let addTimeIsClick = 1;
  $("#addTime").click(function () {
    //addTime product button change img
    if ($(this).children("img").attr("alt") === "chevron-down") {
      $(this).children("img").attr({
        src: "../images/icons/chevron-up.svg",
        alt: "chevron-up",
      });
    } else {
      $(this).children("img").attr({
        src: "../images/icons/chevron-down.svg",
        alt: "chevron-down",
      });
    }
    //req addTime product
    $.ajax({
      type: "get",
      url: "/product",
      data: {
        getUpdateTime: addTimeIsClick,
      },
      success: async function (response) {
        await $(".productBox").remove();
        await $(".contral-product-page").remove();
        await $(".productSlecet").after(`${response}`);
        addTimeIsClick > 0 ? addTimeIsClick-- : addTimeIsClick++;
      },
    });
  });
  //req PriceDesc product & PriceDesc product button change img
  let priceDescIsClick = 1;
  $("#priceDesc").click(function () {
    //PriceDesc product button change img
    if ($(this).children("img").attr("alt") === "chevron-down") {
      $(this).children("img").attr({
        src: "../images/icons/chevron-up.svg",
        alt: "chevron-up",
      });
    } else {
      $(this).children("img").attr({
        src: "../images/icons/chevron-down.svg",
        alt: "chevron-down",
      });
    }
    //req PriceDesc product
    $.ajax({
      type: "get",
      url: "/product",
      data: {
        getPriceDesc: priceDescIsClick,
      },
      success: async function (response) {
        await $(".productBox").remove();
        await $(".contral-product-page").remove();
        await $(".productSlecet").after(`${response}`);
        priceDescIsClick > 0 ? priceDescIsClick-- : priceDescIsClick++;
      },
    });
  });
  //req PriceRange product
  $("input[pattern='[0-9]{7}']").keyup(function () {
    $.ajax({
      type: "get",
      url: "/product",
      data: {
        getPriceRange: {
          form: $("input[name='priceFrom']").val()
            ? $("input[name='priceFrom']").val()
            : 0,
          to: $("input[name='priceTo']").val()
            ? $("input[name='priceTo']").val()
            : 0,
        },
      },
      success: async function (response) {
        await $(".productBox").remove();
        await $(".contral-product-page").remove();
        await $(".productSlecet").after(`${response}`);
      },
    });
  });
  //req productItemPage & ctrl product page css
  $("body").on("click", ".changePage", function () {
    //ctrl product page css
    $(".contral-product-page>button").removeClass("active");
    $(this).addClass("active");
    //req productItemPage
    $.ajax({
      type: "get",
      url: "/product",
      data: {
        prodItemPage: $(this).text(),
      },
      success: async function (response) {
        console.log(response);
        await $(".productBox").remove();
        await $(".productSlecet").after(`${response}`);
      },
    });
  });
  //req productSelecet tag
  $("select[name='selectItem']").on("change", async function () {
    await $.ajax({
      type: "get",
      url: "/product",
      data: {
        prodSelTag: $(this).val(),
      },
      success: async function (response) {
        await $(".productBox").remove();
        await $(".contral-product-page").remove();
        await $(".productSlecet").after(`${response}`);
      },
    });
  });
  //req product comparison
  $("#prodComparison").on("click", function () {
    // $.ajax({
    //   type: "get",
    //   url: "/search",
    //   data: {
    //     search: $(this).val(),
    //   },
    //   success: function (response) {
    //     return;
    //     var values = {};
    //     for (index in response) {
    //       values[index] = response[index].prod;
    //     }
    //     let result = ``;
    //     for (let i = Object.values(values).length - 1; i >= 0; i--) {
    //       result += `<li><a href="/${values[i]}">${values[i]}</a></li>`;
    //     }
    //     result == ""
    //       ? (result = "<li><a href='/'>搜尋無結果</a></li>")
    //       : (result = result);
    //     $("#search-result>ul").html(result);
    //   },
    // });
  });
  //productItem and this button prevent bubble events防止泡沫事件
  $("body").on("click", ".prodToPItem", function (e) {
    console.log("1");
    e.preventDefault();
    e.stopPropagation();
  });
  $("body").on("click", ".ctrlBtn", function (e) {
    console.log("2");
    e.preventDefault();
    e.stopPropagation();
  });
  //jq ready bottom
});