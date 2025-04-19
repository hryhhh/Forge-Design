import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { ButtonProps, ButtonType, ButtonSize } from "./button";

const defaultProps = {
    onClick: jest.fn()
};

const disabledProps = {
    disabled: true,
    onClick: jest.fn()
};

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: "test",
};

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>hello</Button>);
        const element = wrapper.getByText("hello") as HTMLButtonElement;
        expect(element.disabled).toBeFalsy();
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual("BUTTON");
        expect(element).toHaveClass("btn btn-default");
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>hello</Button>);
        const element = wrapper.getByText("hello");
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn-primary btn-large test");
    });

    it('should render a link when href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://example.com">Link</Button>);
        const element = wrapper.getByText("Link");
        expect(element.tagName).toEqual("A");
        expect(element).toHaveClass("btn btn-link");
    });

    it('should render a disabled button when disabled property is provided', () => {
        const wrapper = render(<Button {...disabledProps}>Disabled Button</Button>);
        const element = wrapper.getByText("Disabled Button") as HTMLButtonElement;
        expect(element.disabled).toBeTruthy();
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-default disabled"); // 调整为实际的类名
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
});