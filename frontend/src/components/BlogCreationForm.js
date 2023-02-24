import { useState } from "react"

export function BlogCreationForm(props) {
	const [newBlogTitle, setNewBlogTitle] = useState("")
	const [newBlogAuthor, setNewBlogAuthor] = useState("")
	const [newBlogUrl, setNewBlogUrl] = useState("")

	const handleBlog = (event) => {
		event.preventDefault()
		console.log("Blog createon")
		props.handleNewBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl })
		setNewBlogTitle("")
		setNewBlogAuthor("")
		setNewBlogUrl("")
	}


	return (<form onSubmit={handleBlog}>
		<h2>create new</h2>
		<p>title: <input data-testid="TitleInput" type="text" value={newBlogTitle} name="Title" onChange={({ target }) => setNewBlogTitle(target.value)}/></p>
		<p>author: <input data-testid="AuthorInput" type="text" value={newBlogAuthor} name="Author" onChange={({ target }) => setNewBlogAuthor(target.value)}/></p>
		<p>url: <input data-testid="UrlInput" type="text" value={newBlogUrl} name="Url" onChange={({ target }) => setNewBlogUrl(target.value)}/></p>
		<button type="submit">create</button>
	</form>)
}