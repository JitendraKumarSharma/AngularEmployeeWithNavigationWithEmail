var myExtObject = (function () {
    return {
        resetImage: function (url, image) {
            //$("#profile-img-tag").attr("src", url + "/assets/images/employeeimages/" + image);
            $("#profile-img-tag").attr("src", url + "/" + image);
        }
        //   ,func2: function() {
        //     alert('function 2 called');
        //   }
    }
})(myExtObject || {})


$(document).ready(function () {

});


selectFile = function () {
    $("#photo").click();
};

readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-img-tag').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
};