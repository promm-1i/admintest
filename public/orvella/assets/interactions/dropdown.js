$(function() {
    window.dropdownReset = function(dropdown, placeholderText) {
        dropdown.addClass("placeholder");
        dropdown.removeClass("open");
        dropdown.find("> input").val(""); // 값 초기화
        dropdown.find("> button").text(placeholderText).prop('disabled', false);
        dropdown.find(".dropdown-list button").removeClass("selected");
    };
    window.dropdownRerender = function(dropdown, placeholderText, list) {
        dropdown.addClass("placeholder");
        dropdown.removeClass("open error-row");
        dropdown.find("> input").val("");
        dropdown.find("> button").text(placeholderText);
        dropdown.find(".dropdown-list button").removeClass("selected");
        dropdown.find(".dropdown-list li").remove();
        let listHtml = ""; // [중요] 빈 문자열 초기화 (undefined 방지)
        for (var i = 0; i < list.length; i++) {
            const val = list[i].value !== undefined ? list[i].value : "";
            const lab = list[i].label !== undefined ? list[i].label : val;
            listHtml += `
            <li>
                <button type="button" data-value="${val}">
                    ${lab}
                </button>
            </li>`;
        }
        dropdown.find(".dropdown-list ul").html(listHtml);
    };
    $(document).on("click", ".dropdown-box > button", function(e) {
        const box = $(this).closest(".dropdown-box");
        const list = box.find(".dropdown-list");
        const parentRow = box.closest(".form-row"); // Z-index 제어용 부모
        const otherBoxes = $(".dropdown-box.open, .multi-dropdown-box.open").not(box);
        if (otherBoxes.length > 0) {
            otherBoxes.find(".dropdown-list").slideUp(200);
            otherBoxes.removeClass("open");
            otherBoxes.closest(".form-row").css("z-index", ""); // Z-index 초기화
        }
        list.slideToggle(200);
        box.toggleClass("open");
        if (box.hasClass("open")) {
            parentRow.css("z-index", 999);
        } else {
            parentRow.css("z-index", "");
        }
    });
    $(document).on("click", ".dropdown-list button", function(e) {
        const btn = $(this);
        const box = btn.closest(".dropdown-box");
        const parentRow = box.closest(".form-row");
        const list = box.find(".dropdown-list");
        const label = btn.text();
        const value = btn.attr("data-value");
        if (box.hasClass("placeholder")) box.removeClass("placeholder");
        box.find("> input").val(value).trigger("change");
        box.find("> button").text(label);
        list.find("button").removeClass("selected");
        btn.addClass("selected");
        parentRow.removeClass("error-row");
        const inputName = box.find("> input").attr("name");
        if (inputName) {
            $(`#${inputName}-error`).remove();
            box.find("> input").removeClass("error").removeAttr("aria-describedby");
        }
        list.slideUp(200);
        box.removeClass("open");
        parentRow.css("z-index", ""); // Z-index 초기화
    });
    window.hideResetMultiDropdown = function(selector) {
        selector.find(".dropdown-list").slideUp(200);
        selector.removeClass("open");
        selector.closest(".form-row").css("z-index", ""); // Z-index 초기화
        setTimeout(function() {
            selector.find(".list-search input").val(""); // 검색어 초기화
            selector.find(".dropdown-list li").show();   // 리스트 전체 보이기
            selector.find(".dropdown-list li.empty").remove(); // '결과 없음' 제거
            selector.find(".dropdown-list li p").each(function() {
                $(this).html($(this).text()); // 하이라이팅 제거
            });
        }, 200);
    };
    $(document).on("click", ".multi-dropdown-box > button", function(e) {
        const box = $(this).closest(".multi-dropdown-box");
        const list = box.find(".dropdown-list");
        const parentRow = box.closest(".form-row");
        const otherSingle = $(".dropdown-box.open");
        if (otherSingle.length > 0) {
            otherSingle.find(".dropdown-list").slideUp(200);
            otherSingle.removeClass("open");
            otherSingle.closest(".form-row").css("z-index", "");
        }
        const otherMulti = $(".multi-dropdown-box.open").not(box);
        if (otherMulti.length > 0) {
            hideResetMultiDropdown(otherMulti);
        }
        list.slideToggle(200);
        box.toggleClass("open");
        if (box.hasClass("open")) {
            parentRow.css("z-index", 999);
        } else {
            parentRow.css("z-index", "");
        }
    });
    function executeSearch(searchInput) {
        const box = searchInput.closest(".multi-dropdown-box");
        const list = box.find(".dropdown-list li");
        const keyword = searchInput.val().trim();
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        list.filter(".empty").remove();
        let visibleCount = 0;
        if (keyword) {
            const regex = new RegExp(escapeRegExp(keyword), "gi");
            list.not(".empty").each(function() {
                const $p = $(this).find("p");
                const originalText = $p.text();
                if (originalText.match(regex)) {
                    $p.html(originalText.replace(regex, "<span>$&</span>")); // 하이라이팅
                    $(this).show();
                    visibleCount++;
                } else {
                    $(this).hide();
                }
            });
        } else {
            list.not(".empty").each(function() {
                const $p = $(this).find("p");
                $p.html($p.text());
                $(this).show();
                visibleCount++;
            });
        }
        if (visibleCount === 0 && keyword) {
            if (box.find(".dropdown-list li.empty").length === 0) {
                box.find(".dropdown-list ul").append("<li class='empty'>검색 결과가 없습니다.</li>");
            }
        }
    }
    $(document).on("click", ".multi-dropdown-box .list-search a", function(e) {
        e.preventDefault();
        executeSearch($(this).prev("input"));
    });
    $(document).on("keydown", ".multi-dropdown-box .list-search input", function(e) {
        if (e.keyCode === 13) { // Enter Key
            e.preventDefault();
            executeSearch($(this));
        }
    });
    $(document).on("change", ".multi-dropdown-item", function() {
        const box = $(this).closest(".multi-dropdown-box");
        const row = box.closest(".form-row");
        const checkValues = [];
        box.find(".multi-dropdown-item:checked").each(function() {
            checkValues.push({
                label: $(this).next("p").text(),
                value: $(this).val()
            });
        });
        if (checkValues.length === 0) {
            box.addClass("placeholder");
            box.find("> button").text(box.find("> button").data("placeholder"));
        } else {
            row.removeClass("error-row");
            box.removeClass("placeholder");
            box.find("> button").text(checkValues.map(item => item.label).join(", "));
        }
        box.find("> input").val(checkValues.map(item => item.value).join(",")).trigger("change");
        hideResetMultiDropdown(box);
    });
    $(window).keyup(function(e) {
        if (e.key === "Escape") {
            if ($(".dropdown-box.open").length > 0) {
                const openBox = $(".dropdown-box.open");
                openBox.closest(".form-row").css("z-index", "");
                openBox.find(".dropdown-list").slideUp(200);
                openBox.removeClass("open");
            }
            if ($(".multi-dropdown-box.open").length > 0) {
                hideResetMultiDropdown($(".multi-dropdown-box.open"));
            }
        }
    });
    $(document).click(function(e) {
        if (!$(e.target).closest(".dropdown-box").length) {
            const openBox = $(".dropdown-box.open");
            if (openBox.length > 0) {
                openBox.closest(".form-row").css("z-index", "");
                openBox.find(".dropdown-list").slideUp(200);
                openBox.removeClass("open");
            }
        }
        if (!$(e.target).closest(".multi-dropdown-box").length) {
            const openMulti = $(".multi-dropdown-box.open");
            if (openMulti.length > 0) {
                hideResetMultiDropdown(openMulti);
            }
        }
    });
});