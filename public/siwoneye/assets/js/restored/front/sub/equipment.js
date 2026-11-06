document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        let equipmentTabs = document.querySelectorAll(".cate_tab li");

        if (localStorage.getItem("equipmentTab")) {
            let equipmentTabData = localStorage.getItem("equipmentTab");
            if (equipmentTabData == "equipment-01") {
                equipmentTabs.forEach(tab => {
                    if (tab.value == 7) {
                        tab.classList.add("act");
                        getList(7);
                    }
                });
            } else if (equipmentTabData == "equipment-02") {
                let equipmentSubTabs = document.querySelectorAll(".equipment_sub_tab .sec_tab_it");
                equipmentSubTabs[0].classList.remove("act");
                equipmentSubTabs[1].classList.add("act");
                equipmentTabs.forEach(tab => {
                    if (tab.value == 7) {
                        tab.classList.add("act");
                        getList(8);
                    }
                });
            }
            localStorage.removeItem("equipmentTab");
        } else {
            equipmentTabs[0].classList.add("act");
            getList(1);
        }
    }, 50);

    let equipmentSubTabs = document.querySelectorAll(".equipment_sub_tab .sec_tab_it");
    equipmentSubTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            equipmentSubTabs.forEach(tab => {
                tab.classList.remove("act");
            });
            tab.classList.add("act");
            if (tab.classList.contains("equipment_sub_tab_item01")) {
                getList("7");
            } else {
                getList("8");
            }
        });
    });
});

function getList(cateVal) {
    muAjax({
        url: "./equipment_ajax",
        method: "post",
        data: {
            cate_idx: cateVal
        }
    }).then(function (data) {
        let result = JSON.parse(data);

        //검사명 및 검사 항목 리스트
        let inner = "";
        if (result.cate.cate_name != null && result.cate.cate_name != "") {
            let x = document.getElementsByClassName("detail_tit")[0];
            if (cateVal == "7" || cateVal == "8") {
                document.querySelector(".equipment_sub_tab").style.display = "flex";
                x.innerText = "인공수정체";
            } else {
                document.querySelector(".equipment_sub_tab").style.display = "none";
                x.innerText = result.cate.cate_name;
            }

            /*inner += '<h4 class="tit_6 ko">' + result.cate_list[0].cate_name + '</h4>';
            inner += '<div class="cate_list">';

            $(".cate_box").html(inner);*/
        }

        //정밀 검사 장비 리스트
        inner = "";
        if (0 < result.list.length) {
            for (let i = 0; i < result.list.length; i++) {
                inner += '<div class="equi_cont">';
                inner += '<div class="t_box">';
                inner += '<h5 class="ani_load ltr ani_view">' + result.list[i].name + "</h5>";
                inner += '<span class="sub_en">' + result.list[i].name_en + "</span>";
                inner += '<p class="desc ko br_dn">' + result.list[i].content + "</p>";
                inner += "</div>";
                inner += '<div class="b_box img_box ani_load btt">';
                inner += '<img src="' + result.list[i].img_file + '" alt="서울시원안과">';
                inner += "</div>";
                inner += "</div>";
            }
        }
        $(".equi_wr").html(inner);
    });
}
