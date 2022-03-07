import { firebase } from "@react-native-firebase/auth";
export const baseUrl = 'https://api.groupegael.com/storage/'
export const imageURI = baseUrl + 'images/'
export const Albums = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/albums.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};
export const allActivities = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/activities.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};
export const getDowload = (user, song) => {
    let elements;
    return fetch('https://app.api.groupegael.com/download.php?user=' + encodeURI(user) + '&song=' + encodeURI(song), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}
export const last_album = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/last_album.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};

export const getChants = (id) => {
    let elements;
    return fetch('https://app.api.groupegael.com/chansons.php?id=' + encodeURI(id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}

export const getLivres = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/livres.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}
export const getAbout = () => {
    let elements;
    return fetch('https://api.groupegael.com/abouts', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};
export const getCarnet = () => {
    let elements;
    return fetch('https://api.groupegael.com/activities', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};

export const Worships = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/worships.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};


export const getBible = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/bible.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};

export const Courses = () => {
    let elements;
    return fetch('https://api.groupegael.com/courses', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};

export const Meditations = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/meditations.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
};


export const getComments = (id) => {
    let elements;
    return fetch('https://app.api.groupegael.com/comment_worships.php?worship=' + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}
export const getPrayers = (id) => {
    let elements;
    return fetch('https://app.api.groupegael.com/prayers.php?prayer=' + encodeURI(id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}
export const getLikesWorship = (id) => {
    let elements;
    return fetch('https://app.api.groupegael.com/likes.php?worship=' + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}

export const getLikesMeditation = (id) => {
    let elements;
    return fetch('https://app.api.groupegael.com/likes.php?meditation=' + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}
export const getTrainings = () => {
    let elements;
    return fetch('https://app.api.groupegael.com/courses.php', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}

export const getTraining = (id) => {
    let elements;
    return fetch('https://app.api.groupegael.com/course.php?cours=' + encodeURI(id), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elements),
    }, )
}


export const postTraining = (myForm) => {
    return fetch(
        'https://app.api.groupegael.com/post_student.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myForm),
        },
    )
}

export const postLike = (myForm) => {
    return fetch(
        'https://app.api.groupegael.com/post_like.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myForm),
        },
    )
}

export const postComment = (myForm) => {
    return fetch(
        'https://app.api.groupegael.com/post_comment.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myForm),
        },
    )
}

export const postPrayer = (myForm) => {
    return fetch(
        'https://app.api.groupegael.com/postprayer.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myForm),
        },
    )
}

// post internaute

export const postUser = (user) => {
    return fetch(
        'https://app.api.groupegael.com/store_user.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
    )
}

export const postUserSocial = (user) => {
    return fetch(
        'https://app.api.groupegael.com/store_user_social.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
    )
}

export const getUser = (user) => {
    return fetch(
        'https://app.api.groupegael.com/get_user.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
    )
}

export const searchFriend = (user) => {
    return fetch(
        'https://app.api.groupegael.com/searchFriend.php ', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
    )
}
export const askFriend = (user, ask) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/askFriend.php?user=' + encodeURI(user) + '&ask=' + encodeURI(ask), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}
export const cancFriend = (user, ask) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/cancelFriend.php?user=' + encodeURI(user) + '&ask=' + encodeURI(ask), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}

export const waitFriend = (user) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/waitFriend.php?user=' + encodeURI(user), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}
export const myAskFriend = (user) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/myAskFriend.php?user=' + encodeURI(user), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}
export const myFriend = (user) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/myFriend.php?user=' + encodeURI(user), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}
export const messaging = (user) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/suivi_ami.php?user=' + encodeURI(user), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}

export const confirmFriend = (user, friend) => {
    let response;
    return fetch(
        'https://app.api.groupegael.com/confirmFriend.php?user=' + encodeURI(user) + '&friend=' + encodeURI(friend), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        },
    )
}
export const sendMessaging = async(form) => {

    return await fetch(
        'https://app.api.groupegael.com/message.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        },
    )
}
export const getMessaging = async(message) => {
    let form;
    return await fetch(
        'https://app.api.groupegael.com/messaged.php?id=' + encodeURI(message), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        },
    )

}