# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Seeders content

```Users Admin
      firstName: Miguel Ángel
      lastName: Andrade
      email: miguel@gmail.com
      password: Miguel1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_black_tone_people_person_avatar_icon_159356.png


      firstName: Martina
      lastName: Benítez
      email: martina@gmail.com
      password: Martina1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_people_person_avatar_black_tone_icon_159371.png


      firstName: Juan Carlos
      lastName: Castillo
      email: juan@gmail.com
      password: Juan1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png


      firstName: Jazmín
      lastName: Castro
      email: jazmin@gmail.com
      password: Jazmin1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_avatar_white_tone_icon_159354.png


      firstName: Carlos Alberto
      lastName: Contreras
      email: carlos@gmail.com
      password: Carlos1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_black_tone_avatar_people_person_icon_159369.png


      firstName: Delfina
      lastName: De León
      email: delfina@gmail.com
      password: Delfina1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_user_white_tone_icon_159359.png


      firstName: José Luis
      lastName: Díaz
      email: jose@gmail.com
      password: Jose1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_person_avatar_people_white_tone_icon_159357.png


      firstName: Lucía
      lastName: Duarte
      email: lucia@gmail.com
      password: Lucia1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png


      firstName: Lucas
      lastName: Espinoza
      email: lucas@gmail.com
      password: Lucas1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/man_boy_people_avatar_user_person_black_skin_tone_icon_159355.png


      firstName: Emilia
      lastName: Fernández
      email: emilia@gmail.com
      password: Emilia1234
      role: Admin
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png
```

```Users Standard
      firstName: Benjamín
      lastName: Flores
      email: benjamin@gmail.com
      password: Benjamin1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_white_tone_icon_159368.png


      firstName: Catalina
      lastName: García
      email: catalina@gmail.com
      password: Catalina1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159367.png


      firstName: Martín
      lastName: Giménez
      email: martin@gmail.com
      password: Martin1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_people_avatar_man_boy_curly_hair_icon_159362.png


      firstName: Victoria
      lastName: Gómez
      email: victoria@gmail.com
      password: Victoria1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_avatar_people_person_white_tone_icon_159370.png


      firstName: Gabriel
      lastName: Gonzales
      email: gabriel@gmail.com
      password: Gabriel1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png


      firstName: Mía
      lastName: Gutiérrez
      email: mia@gmail.com
      password: Mia1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png


      firstName: Santiago
      lastName: Hernández
      email: santiago@gmail.com
      password: Santiago1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png


      firstName: Inés
      lastName: Morales
      email: ines@gmail.com
      password: Ines1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png


      firstName: Charlie
      lastName: Pérez
      email: charlie@gmail.com
      password: Charlie1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png


      firstName: Camila
      lastName: Portillo
      email: camila@gmail.com
      password: Camila1234
      role: Standard
      image: https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png
```
