import { useEffect, useRef, useState } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import ErrorNotification from "./components/ErrorNotification"
import SuccessNotification from "./components/SuccessNotification"
import Togglable from "./components/Togglable"
import { BlogCreationForm } from "./components/BlogCreationForm"
import BlogService from "./services/blogs"

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const [successInfo, setSuccessInfo] = useState(null)

	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)


	const newBlogToggleRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			setUser(user)
			setUsername("")
			setPassword("")
			blogService.setToken(user.token)

			window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
			setSuccessInfo("Logged in successfully")
			setTimeout(() => {
				setSuccessInfo(null)
			}, 5000)

		} catch (exception) {
			console.log(exception)
			setErrorMessage("wrong credentials")
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem("loggedBlogUser")
		setUser(null)
		setSuccessInfo("Logged out successfully")
		setTimeout(() => {
			setSuccessInfo(null)
		}, 5000)
	}
	const handleNewBlog = async (blogObject) => {
		const response = await blogService.create(blogObject)
		setSuccessInfo(`a new blog ${blogObject.title} by ${blogObject.author} added`)
		setTimeout(() => {
			setSuccessInfo(null)
		}, 5000)
		setBlogs(blogs.concat(response))
		newBlogToggleRef.current?.toggleVisibility()
	}

	const handleUpdateBlog = async (blogObject) => {
		const updated = await BlogService.update(blogObject.id, blogObject)
		setBlogs(blogs.map(value => value.id !== updated.id ? value : updated))
	}
	const handleRemoveBlog = async (id) => {
		try {
			await BlogService.remove(id)
			setBlogs(blogs.filter(value => value.id !== id))
			setSuccessInfo("Blog removed")
			setTimeout(() => {
				setSuccessInfo(null)
			}, 5000)
		} catch (e) {
			setErrorMessage(e.message)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}


	if (user === null) {
		return (<div>
			<ErrorNotification errorMessage={errorMessage}></ErrorNotification>
			<SuccessNotification successInfo={successInfo}></SuccessNotification>
			<h2>Log in to application</h2>
			<form id="loginForm" onSubmit={handleLogin}>
				<div>
					username
					<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
				</div>
				<div>password
					<input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>)
	}


	return (<div>
		<ErrorNotification errorMessage={errorMessage}></ErrorNotification>
		<SuccessNotification successInfo={successInfo}></SuccessNotification>
		<h2>blogs</h2>
		<p>{user.name} logged in
			<form onSubmit={handleLogout}>
				<button id="logoutButton" type="submit">logout</button>
			</form></p>

		<Togglable buttonLabel="Create new blog" ref={newBlogToggleRef}>
			<BlogCreationForm handleNewBlog={handleNewBlog}/>
		</Togglable>

		{[...blogs].sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdateBlog} handleRemoveBlog={handleRemoveBlog} enableRemoving={blog.user.username === user.username}/>)}
	</div>)
}

export default App