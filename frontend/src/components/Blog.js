import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, handleUpdate, handleRemoveBlog, enableRemoving }) => {
	const [viewing, setViewing] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleViewing = () => {
		setViewing(!viewing)
	}

	const handleLike = async () => {
		const toBeSent = {
			id: blog.id,
			user: blog.user.id,
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url
		}
		handleUpdate(toBeSent)
	}

	const handleRemove = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
			handleRemoveBlog(blog.id)
	}

	return (<div style={blogStyle} className="blog">
		<div>{blog.title} {blog.author}</div>
		<button onClick={toggleViewing}>view</button>
		{viewing && (<>
			<div>{blog.url}</div>
			<div>likes {blog.likes}
				<button onClick={handleLike}>Like</button>
			</div>
			<div>{blog.user.name}</div>
			{enableRemoving && <button onClick={handleRemove}>remove</button>}
		</>)}
	</div>)
}
Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleUpdate: PropTypes.func.isRequired,
	handleRemoveBlog: PropTypes.func.isRequired,
	enableRemoving: PropTypes.bool.isRequired
}

export default Blog