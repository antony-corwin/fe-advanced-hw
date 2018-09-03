const sharmPlace = 15;
const hurgadaPlace = 25;
const tabaPlace = 6;

const needPlace = prompt("Веедите количество необходимых мест:");

if (needPlace >= 0 && needPlace % 1 === 0) {
    if (needPlace <= sharmPlace) {
        let wantBeInGroup = confirm(
            "есть место в группе sharm, вы согласны быть в этой группе?"
        );
        if (wantBeInGroup === true) {
            alert("Приятного путешествия в группе sharm!");
        } else {
            alert("Нам очень жаль, приходите еще!");
        }
    } else if (needPlace <= hurgadaPlace) {
        let wantBeInGroup = confirm(
            "есть место в группе hurgada, вы согласны быть в этой группе?"
        );
        if (wantBeInGroup === true) {
            alert("Приятного путешествия в группе hurgada!");
        } else {
            alert("Нам очень жаль, приходите еще!");
        }
    } else if (needPlace <= tabaPlace) {
        let wantBeInGroup = confirm(
            "есть место в группе taba, вы согласны быть в этой группе?"
        );
        if (wantBeInGroup === true) {
            alert("Приятного путешествия в группе taba!");
        } else alert("Нам очень жаль, приходите еще!");
    } else {
        alert("Извините, столько мест нет ни в одной группе!");
    }
} else {
    alert("Ошибка ввода!");
}