import {render, screen, cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import {AssignmentCard} from "../AssignmentCard";
import {MemoryRouter} from "react-router";
import {BrowserRouter} from "react-router-dom";

afterEach(() => {
    cleanup();
})

test('should render AssignmentCard component that is not picked up yet', () => {
    // Act
    const assignment = {id: 1, title: "test", description: "test description", creator: "Ruby"};
    render(<AssignmentCard assignment={assignment}/>, {wrapper: MemoryRouter});
    const assignmentCard = screen.getByTestId(`assignmentcard-${assignment.id}`)

    //Assert
    expect(assignmentCard).toBeInTheDocument();
    expect(assignmentCard).toHaveTextContent("test");
    expect(assignmentCard).toHaveTextContent("More information");
})

test('should render AssignmentCard component that is accepted by a company', () => {
    // Act
    const assignment = {
        id: 1,
        title: "test",
        description: "test description",
        creator: "Ruby",
        executor: "Piet",
        executionDateTime: "2022-12-01 12:35:47.283000",
        executionPrice: "5"
    };

    render(<AssignmentCard assignment={assignment}/>, {wrapper: MemoryRouter});
    const assignmentCard = screen.getByTestId(`assignmentcard-${assignment.id}`)

    //Assert
    expect(assignmentCard).toBeInTheDocument();
    expect(assignmentCard).toHaveTextContent("test");
    expect(assignmentCard).toHaveTextContent("Piet");
    // check if datetime is properly converted
    expect(assignmentCard).toHaveTextContent("01-12-2022 12:35");
    expect(assignmentCard).toHaveTextContent("5");

})

test('matches snapshot', () => {
    const assignment = {id: 1, title: "test", description: "test description", creator: "Ruby"};
    const tree = renderer.create(<BrowserRouter><AssignmentCard assignment={assignment}/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});