let container = document.getElementById("container");

        async function fetchData() {
            container.innerHTML = ''; // Clear previous data

            try {
                let response = await fetch(`http://localhost:3000/movies`);
                const datas = await response.json();
                console.log(datas);
                for (let i = 0; i < datas.length; i++) {
                    const div = document.createElement("div");
                    const obj = datas[i];
                    div.innerHTML = `
                        Title: ${obj.title}<br>
                        Id: ${obj.id}<br>
                        Genre: ${obj.genre}<br>
                        Director: ${obj.director}<br>
                        Release: ${obj.releaseYear}<br>
                        <button onclick="deleteMovie (${obj.id})" id="delete">Delete</button>
                        <button onclick="showUpdateForm (${obj.id})" id="update">Update</button>
                    `;
                    container.appendChild(div);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        const addMovieForm = document.getElementById("addMovieForm");

        addMovieForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const titlevar = document.getElementById("titleInput").value;
            const genrevar = document.getElementById("genreInput").value;
            const directorvar = document.getElementById("directorInput").value;
            const releaseYear = document.getElementById("releaseYearInput").value;

            const newMovie = {
                title: titlevar,
                genre: genrevar,
                director: directorvar,
                releaseYear: releaseYear,
            };

            try {
                const response = await fetch("http://localhost:3000/movies", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newMovie),
                });

                if (response.ok) {
                    alert("New movie added");
                    fetchData();
                } else {
                    throw new Error("Error adding new movie");
                }
            } catch (error) {
                console.error("Error adding new movie:", error);
            }
        });

        async function deleteMovie(movieId) {
            try {
                const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Movie deleted");
                    fetchData();
                } else {
                    throw new Error("Error deleting movie");
                }
            } catch (error) {
                console.error("Error deleting movie:", error);
            }
        }

        function showUpdateForm(movieId) {
            const updateForm = document.createElement("form");
            updateForm.innerHTML = `
                Title: <input type="text" id="updateTitleInput" required><br>
                Genre: <input type="text" id="updateGenreInput" required><br>
                Director: <input type="text" id="updateDirectorInput" required><br>
                Release Year: <input type="number" id="updateReleaseYearInput" required><br>
                <button type="submit">Update Movie</button>
            `;

            updateForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const updatedTitle = document.getElementById("updateTitleInput").value;
                const updatedGenre = document.getElementById("updateGenreInput").value;
                const updatedDirector = document.getElementById("updateDirectorInput").value;
                const updatedReleaseYear = document.getElementById("updateReleaseYearInput").value;

                const updatedMovie = {
                    title: updatedTitle,
                    genre: updatedGenre,
                    director: updatedDirector,
                    releaseYear: updatedReleaseYear,
                };

                try {
                    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedMovie),
                    });

                    if (response.ok) {
                        alert("Movie updated");
                        fetchData();
                    } else {
                        throw new Error("Error updating movie");
                    }
                } catch (error) {
                    console.error("Error updating movie:", error);
                }
            });

            container.appendChild(updateForm);
        }