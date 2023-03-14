// 2023/03/07
import $ from 'jquery'
import 'slick-carousel';

getCSV(new URL("database.csv", "http://127.0.0.1:5500/dist/"));// 本番：パスを変更
getCSV(new URL("database3.csv", "http://127.0.0.1:5500/dist/"));// 同上

//processes about CSV
function getCSV(URLObj: URL) {
    const req = new XMLHttpRequest();
    const url = new URL(URLObj);
    req.open("get", url, true);
    req.send(null);

    //if csv could get, call convertCSVtoArray()	
    req.onload = function () {
        convertCSVtoArray(req.responseText, URLObj);
    }
}

//chage CSV to two-dimensional array
function convertCSVtoArray(str: String, URLObj: URL) {
    let result = [];
    let result2 = [];
    let tmp = str.split("\n");
    if (URLObj.toString() == "http://127.0.0.1:5500/dist/database.csv") {//本番：パスの変更
        // create two-dimensional array separate each lows in ","
        for (let i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(',');
        }
        for (let i = 0; i < result.length; i++) {
            for (let o = 0; o < result[i].length; o++) {
                if (result[i][o].indexOf("\r") != -1 && result[i][o] != undefined) {
                    result[i][o] = result[i][o].substr(0, result[i][o].indexOf("\r"))
                }
            }
        }
        makeTab(result);
    } else if (URLObj.toString() == "http://127.0.0.1:5500/dist/database3.csv") {//本番：パスを変更
        // create two-dimensional array separate each lows in ","
        for (let i = 0; i < tmp.length; ++i) {
            result2[i] = tmp[i].split(',');
        }
        for (let i = 0; i < result2.length; i++) {
            for (let o = 0; o < result2[i].length; o++) {
                if (result2[i][o].indexOf("\r") != -1 && result2[i][o] != undefined) {
                    result2[i][o] = result2[i][o].substr(0, result2[i][o].indexOf("\r"))
                }
            }
        }
        makeModalWindow(result2);
    }
}

//make modal window about literature list and detail
function makeModalWindow(result: String[][]) {
    let modal_content = document.getElementById("modal-content");
    if (modal_content !== null) {
        modal_content.innerHTML = `
        <div class="description-area">
            <h2>文献について</h2>
            <p>本デジタルアーカイブでは、西浦田楽の演目に関する文献を計${result.length - 1}件閲覧できます<br>
            各文献をクリックすることで文献の基本情報を見ることができます</p>
        </div>
        <h3>文献一覧</h3>
        <div id="literature-list" class="literature-list"><div>`;
    }

    let literature_list = document.getElementById("literature-list");
    if (literature_list !== null) {
        for (let i = 1; i < result.length; i++) {
            literature_list.innerHTML += `
            <div class="literature-block">
                <p>${result[i][0]}<br>${result[i][1]}<br>
                <img src="./img/${result[i][0]}_thumbnail.jpg" alt="thumbnail-image"></p>
            </div>
            <div class="modal-container2">
                <div class="modal-body2">
                    <img class="modal-close2" src="./img/close-btn.png" alt="close-button">
                    <div id="modal-content2" class="modal-content2">
                        <h3>${result[i][1]}</h3>
                        <div class="literature-detail">
                            <img src="./img/${result[i][0]}_thumbnail.jpg" alt="thumbnail-image">
                            <table class="literature-detail-table">
                                <tr><th>著者</th><td>${result[i][0].substr(0, result[i][0].indexOf("("))}</td></tr>
                                <tr><th>発行年</th><td>${result[i][0].substring(result[i][0].indexOf("(") + 1, result[i][0].indexOf(")"))}</td></tr>
                                <tr><th>収録</th><td>${result[i][2]}</td></tr>
                                <tr><th>出版</th><td>${result[i][3]}</td></tr>
                                <tr><th>ページ数</th><td>${result[i][4]}</td><tr>
                                <tr><th>目次</th><td>${result[i][5]}</td><tr>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }
    makemodal1();
}

//make table
function makeTab(result: String[][]) {
    //make parent
    let temp;
    let parent_tab = document.getElementById("parent");
    if (parent_tab !== null) {
        for (let i = 0; i < result.length - 1; i++) {
            if (i == 0) {
                parent_tab.innerHTML = "<li class='active'><div class='triangle'></div><a href='#tab1' class='p-tab' data-toggle='tab'>" + result[0][0] + "</a></li>";
                temp = result[0][0];
            }
            if (temp != result[i][0]) {
                parent_tab.innerHTML += "<li class='not-show'><div class='triangle'></div><a href='#tab" + result[i][2] + "' class='p-tab' data-toggle='tab'>" + result[i][0] + "</a></li>";
                temp = result[i][0];
            }
        }
    }

    //make child ul
    let temp2;
    let amountOfTab = 0;
    let child_tab = document.getElementById("tab-content");
    if (child_tab !== null) {
        for (let i = 0; i < result.length; i++) {
            if (i == 0) {
                child_tab.innerHTML = '<ul class="nav nav-tabs sub-tab-content" id="tab1"></ul>';
                temp2 = result[0][0];
                amountOfTab++;
            }
            if (temp2 != result[i][0]) {
                child_tab.innerHTML += "<ul class='nav nav-tabs sub-tab-content' id='tab" + result[i][2] + "'></ul>";
                temp2 = result[i][0];
                amountOfTab++;
            }
        }
    }

    //make child li&a
    for (let i = 1; i <= amountOfTab; i++) {
        for (let o = 0, q = 0; o < result.length; o++, q = q + 7) {
            if (result[o][2] == String(i)) {
                let tab_content = document.getElementById("tab" + String(i));
                if (tab_content !== null) {
                    tab_content.innerHTML += `
                    <div class='contents-block not-show'>
                        <li class='content-list active'>
                            <div class='triangle2'></div>
                            <a class='none-a' href='#child-tab ${(o + 1)}' class='c-tab' data-toggle='tab' title='${result[o][1]}'>${result[o][1]}</a>
                        </li>
                        <div class='tab-contents' id='child-tab ${(o + 1)} '>
                            <ul id='slider${o + 1}' class='slider'></ul>
                        </div>
                    </div>`;
                }
                let tab_detail_content = document.getElementById("slider" + (o + 1));
                if (tab_detail_content !== null) {
                    for (let p = 3; result[o][p]; p = p + 3) {
                        tab_detail_content.innerHTML += `
                            <li>
                                <input id="checkbox" class='checkboxes' type='checkbox' name='option' value='${result[o][p + 2]}'>
                                <a class='view-link' href='./view.html?manifest1=${result[o][p + 2]}'>
                                    <div class='document-des'>
                                        <img class='book' src='./img/${result[o][p]}_thumbnail.jpg' alt='thumbnail image'><br>
                                        <p class='author-title'>${result[o][p]}<br>${result[o][p + 1]}</p>
                                    </div>
                            </li></a>`;
                    }//progression modal-window
                }
            }
        }
    }
    tabQuery();
}

//functions about tab
function tabQuery() {
    let activeTag = $('ul.parent-tab-content').find("li.active a").first();
    if (!activeTag) {
        activeTag = $('ul.parent-tab-content').find("li").first().find("a").first();
    }
    setActive(activeTag);
    $(activeTag.attr('href') as any).addClass('active');

    // //control parent-tab-contet movements
    $('ul.parent-tab-content a[data-toggle="tab"]').on('click', function (e) {
        //get and removeClass("active") of first li
        const activeFirst = $('ul.parent-tab-content').find("li.active a").first();
        activeFirst.parent().removeClass("active");
        activeFirst.parent().addClass("not-show");
        setActive(activeFirst);

        //change active and not-active　of elements 
        $(e.target).parent().parent().addClass("active");
        $(e.target).parent().addClass("active");
        $(e.target).parent().removeClass("not-show");
        if (e.relatedTarget != null) {
            $(e.relatedTarget).parent().removeClass("active");
            $(e.relatedTarget).parent().addClass("not-show");
        }
        setActive($(e.target));

    });

    // addClass 'active' to the first li
    function setActive(targetObj: JQuery) {
        const targetMenuId = targetObj.attr("href");
        let targetTabId = $(targetMenuId as any).find("li.active a").first().attr("href");
        if (!targetTabId) {
            $(targetMenuId as any).find("li").first().addClass("active");
            $(targetMenuId as any).find("li").first().removeClass("not-show");
            targetTabId = $(targetMenuId as any).find("li").first().find("a").attr("href");
        }
        $(targetTabId as any).addClass('active').addClass('in');
        $(targetTabId as any).parent().removeClass('not-show');
        $(targetTabId as any).parent().addClass('active');
    }


    $("input[name='option']").change(function () {
        const checkbox = document.getElementsByName("option") as NodeListOf<HTMLInputElement>;
        for (let i = 0; i < checkbox.length; i++) {
            // let parent = $(checkbox[i]).parent().parent().parent().parent().parent().parent().parent().parent();
            let parent = $(this).parent().parent().parent().parent().parent().parent().parent().parent();
            if ($(this).prop("checked")) {
                $(parent).css("background-color", "rgb(218, 227, 243)");
            } else {
                $(parent).css("background-color", "rgba(225, 219, 219, 0.4)");
            }
        }
        showCheckedLiteratureNum(getChecked());
    })

    slider();
};

//get checks of checkboxes
function getChecked() {
    let checkedDatas = [];
    const checked = document.querySelectorAll("input[name=option]:checked");
    for (let i = 0; i < checked.length; i++) {
        checkedDatas.push(checked[i]);
    }
    return checkedDatas;
}

//show number of checked literature
//if the number of checked literature is upper limit(4) make checkbox disabled
function showCheckedLiteratureNum(checkedDatas: Element[]) {
    if (checkedDatas.length == 0) {
        $(".checked-number-area").css("display", "none");
    } else {
        $(".checked-number-area").text("選択された文献  " + checkedDatas.length + "/4件");
        $(".checked-number-area").css("display", "block");
    }
    if (checkedDatas.length >= 4) {// upper limit to select literature is 4
        $(".checked-number-area").css("color", "red");
        $(".checkboxes").prop("disabled", true);
    } else {
        $(".checked-number-area").css("color", "black");
        $(".checkboxes").prop("disabled", false);
    }
}

//when use history.back(), check state of checkbox and change background-color of div 
window.onload = function () {
    const checkedDatas = getChecked();
    for (let i = 0; i < checkedDatas.length; i++) {
        let parent = $(checkedDatas[i]).parent().parent().parent().parent().parent().parent().parent().parent();
        $(parent).css("background-color", "rgb(218, 227, 243)");
    }
    showCheckedLiteratureNum(checkedDatas);
}

//release all checked options
const release_check_btn = document.getElementById("release-check");
release_check_btn?.addEventListener("click", function () {
    const checkebox = document.getElementsByName("option") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < checkebox.length; i++) {
        checkebox[i].checked = false;
        let parent = $(checkebox[i]).parent().parent().parent().parent().parent().parent().parent().parent();
        $(parent).css("background-color", "rgba(225, 219, 219, 0.4)");
    }
    showCheckedLiteratureNum(getChecked());
});

//submit IIIF manifest Link of checked literature to view.html using query
const compare_btn = document.getElementById("compare-button");
compare_btn?.addEventListener("click", function () {
    const checkedDatas = getChecked();
    if (checkedDatas.length == 0) {
        window.alert("文献が選択されていません。");
    } else if (checkedDatas.length > 4) {
        window.alert("選択できる文献は４つまでです。");
    } else {
        let linkTxt = "./view.html?";
        for (let i = 1; i <= checkedDatas.length; i++) {
            linkTxt += "manifest" + i + "=" + checkedDatas[i - 1] + "&";
        }
        window.location.href = linkTxt;
    }
})

// function about slider 
function slider() {
    $('.slider').slick({
        autoplay: false,//move automatically or not
        infinite: true,//roop slide or not 
        slidesToShow: 5,//number of slides to show
        slidesToScroll: 1,//number of moveing slides when scroll
        prevArrow: '<div class="slick-prev"></div>',//make prevArrow
        nextArrow: '<div class="slick-next"></div>',//make nextArrow
        dots: false,//show dots navigation or not 
        responsive: [
            {
                breakpoint: 1449,//note PC
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 769,//tablet
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 426,//mobile
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
}

// function about modal-window (overall)
function makemodal1() {
    const open = $("#information");
    const close = $(".modal-close");
    const container = $(".modal-container");

    //whem click open btn
    open.on('click', function () {
        container.addClass("active");
        return false;
    })

    //when click close btn
    close.on('click', function () {
        container.removeClass('active');
    });

    //when click outside of modal-window
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.modal-body').length) {
            container.removeClass('active');
        }
    });
    makemodal2();
};

// function about modal-window2 (overall2)
function makemodal2() {
    const open = $(".literature-block");
    const close = $(".modal-close2");

    //whem click open btn
    open.on('click', function () {
        let container = $(this).next();
        container.addClass("active");
        return false;
    })

    //when click close btn
    close.on('click', function () {
        let container = $(".modal-container2" + ".active");
        container.removeClass('active');
    });

    //when click outside of modal-window
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.modal-body2').length) {
            let container = $(".modal-container2" + ".active");
            container.removeClass('active');
        }
    });
    makemodal3();
};

// function about modal-window3 (manipulate introduction)
function makemodal3() {
    const open = $(".introduction-btn");
    const close = $(".modal-close3");
    const container = $(".modal-container3");

    //whem click open btn
    open.on('click', function () {
        container.addClass("active");
        return false;
    })

    //when click close btn
    close.on('click', function () {
        container.removeClass('active');
    });

    //when click outside of modal-window
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.modal-body3').length) {
            container.removeClass('active');
        }
    });
    slider2();
};

// function about slider of introduction manipulate
function slider2() {
    $('.slider2').slick({
        autoplay: false,//move automatically or not
        infinite: true,//roop slide or not 
        slidesToShow: 1,//number of slides to show
        slidesToScroll: 1,//number of moveing slides when scroll
        prevArrow: '<div class="slick-prev2"></div>',//make prevArrow
        nextArrow: '<div class="slick-next2"></div>',//make nextArrow
        dots: true,//show dots navigation or not 
    });
    showManipulate();
}

//first access or long time no accessed, show introduction of manipulate
function showManipulate() {
    const lastAccess = localStorage.getItem("lastDate");
    const showOrNot = localStorage.getItem("show-or-not");
    const date = new Date();
    const today = String(date.getFullYear()) + String((date.getMonth() + 1)) + String(date.getDate());

    if (showOrNot == "not-show") {
        checkValue.checked = true;
    }

    if (lastAccess == null && showOrNot == null) {
        localStorage.setItem("lastDate", today) //set today to cash
        // localStorage.setItem("lastDate", "20221101"); //test data
        localStorage.setItem("show-or-not", "show");
        $(".modal-container3").addClass("active");
    } else if (Number(today) - Number(lastAccess) >= 100 && showOrNot == "show") {
        localStorage.setItem("lastDate", today) //set today to cash
        $(".modal-container3").addClass("active");
    }
}

// check state "show" or "not-show" manipulate description(modal)
let checkValue = document.getElementById("check-whether") as HTMLInputElement;
function checkState() {
    if (checkValue !== null) {
        if (checkValue && checkValue.checked) {
            localStorage.setItem("show-or-not", "not-show");
            console.log(localStorage.getItem("show-or-not"));
        } else {
            localStorage.setItem("show-or-not", "show");
            console.log(localStorage.getItem("show-or-not"));
        }
    }
}

// reverse state "show" or "not-show" when "今後表示しない" is clicked
const check_whether = document.getElementById("check-whether");
const check_whether_label = document.getElementById("check-whether-label");
check_whether && check_whether_label?.addEventListener("click", function () {
    if (checkValue.checked) {
        checkValue.checked = false;
    } else {
        checkValue.checked = true;
    }
    checkState();
})


// function about modal-window (individual)
// $(function () {
    //     getCSV("./database3.csv");
//     console.log(result2);
//     let open = $(".modal-open"),
//         close = $(".modal-close"),
//         container = "";
//     //when click open btn
//     open.on('click', function () {
//         auth_title = ($(this).next().children().children().next().next().text());
//         content = auth_title.substr(0, auth_title.indexOf(")") + 1);
//         container = $(this).parent().find(".modal-container");
//         container.html = `<p>${result2[0][0]}</p>`;
//         console.log(container.html);
//         container.addClass('active');
//         return false;
//     });

//     //when click close btn
//     close.on('click', function () {
//         container.removeClass('active');
//     });

//     //when click outside of modal-window
//     $(document).on('click', function (e) {
//         if (!$(e.target).closest('.modal-body').length) {
//             // container.removeClass('active');
//         }
//     });
// });

