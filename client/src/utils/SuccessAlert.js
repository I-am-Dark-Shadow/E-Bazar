import Swal from 'sweetalert2';

const SuccessAlert = (title) => {
    const alert = Swal.fire({
        icon: "success",
        title: title,
        color: "#92f860",
        confirmButtonColor: "#00b050",
        confirmButtonText: "OK",

    });

    return alert
}

export default SuccessAlert