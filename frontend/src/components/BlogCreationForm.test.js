import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { BlogCreationForm } from "./BlogCreationForm"
import userEvent from "@testing-library/user-event"


test("Form calls correctly", () => {
	const user = userEvent.setup()
	const mock = jest.fn()

	render(<BlogCreationForm handleNewBlog={mock}/>)

	const titleElement = screen.getByTestId("TitleInput")
	const authorElement = screen.getByTestId("AuthorInput")
	const urlElement = screen.getByTestId("UrlInput")

	const submitButton = screen.getByText("create")
	user.type(titleElement, "A Title")
	user.type(authorElement, "An Author")
	user.type(urlElement, "An Url")

	user.click(submitButton)


	expect(mock.mock.calls).toHaveLength(1)
	expect(mock.mock.calls[0][0].content).toBe({ author: "An Author", title: "A Title", url: "An Url" })
})