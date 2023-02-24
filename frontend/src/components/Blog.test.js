import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("Render Not viewing", () => {
	const blog = {
		id: 1,
		author: "an Author",
		title: "A Title",
		url: "An Url",
		likes: 0,
		user: { id: 1, username: "A Username", name: "A Name" }
	}

	const emptyFunc = jest.fn()
	render(<Blog handleUpdate={emptyFunc} blog={blog} handleRemoveBlog={emptyFunc} enableRemoving={false}/>)

	const element = screen.getByText(`${blog.title} ${blog.author}`)
	expect(element).toBeDefined()


	expect(screen.queryByText(`${blog.url}`)).toBeNull()
	expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
})

test("Render viewing", async () => {
	const blog = {
		id: 1,
		author: "an Author",
		title: "A Title",
		url: "An Url",
		likes: 0,
		user: { id: 1, username: "A Username", name: "A Name" }
	}

	const emptyFunc = jest.fn()
	render(<Blog handleUpdate={emptyFunc} blog={blog} handleRemoveBlog={emptyFunc}/>)

	const user = userEvent.setup()
	const button = screen.getByText("view")
	await user.click(button)


	expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined()


	expect(screen.getByText(`${blog.url}`)).toBeDefined()
	expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined()
	expect(screen.getByText(`${blog.user.name}`)).toBeDefined()
})

test("Render viewing", async () => {
	const blog = {
		id: 1,
		author: "an Author",
		title: "A Title",
		url: "An Url",
		likes: 0,
		user: { id: 1, username: "A Username", name: "A Name" }
	}

	const emptyFunc = jest.fn()
	render(<Blog handleUpdate={emptyFunc} blog={blog} handleRemoveBlog={emptyFunc}/>)

	const user = userEvent.setup()
	const button = screen.getByText("view")
	await user.click(button)


	const likeButton = screen.getByText("Like")

	await user.click(likeButton)
	await user.click(likeButton)
	expect(emptyFunc.mock.calls).toHaveLength(2)
})