import React from "react";

interface usersInterface {
    _id: string,
    userName: string,
    email: string,
    passwordHash: string,
    updatedAt: string,
    createdAt: string
}  // фикс? Распарсить

export function Profile() {

    const [user, setUser] = React.useState<usersInterface>();
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const loginCoockieFind = () => { // Переписать функцию, когда появится больше cookie

      let coockies = document.cookie;
      coockies.split(';')

      return coockies.replace(/LoginToken=\s?/, '');

    }

    React.useEffect(() => {
        fetch("/profile", {
            headers: {
                authorization: loginCoockieFind()
            }
        })
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setUser(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

    if (error) {
        return <div>Ошибка: {error}</div>;
      } else if (!isLoaded) {
        return <div>Загрузка...</div>;
     } else if (user === undefined) {
        return <div>Не удалось получить информацию о профиле</div>
     }
      else {
        return <>
            <div>{user.userName}</div>
            <div>{user.email}</div>
          </>
      }

}
