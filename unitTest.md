# Scenario

We've accidentally deleted our reusable component library repository, but thankfully we were able to recover the unit tests.

## Instructions

You should spend no more than 2.5 hours in total on the challenge as a whole.

Each task is of equal importance, so it is better to partially complete both tasks, rather than fully complete one, leaving comments as to your intention.

You may work on the two tasks in any order, or interleave them if preferred.

We are interested in seeing your performance on the task within the given time, and will take the given time into consideration when assessing performance.

The resulting code repository should be provided back to us as a GitHub repo.

## Task One - Configuration and Documentation

Your initial task is to build a repository that we could use as a foundation for a component library. We would recommend:
- Typescript
- React
- React Testing Library
- Vitest

If you have time, consider also how you might handle linting, formatting, any other Developer Experience improvements or quality of life support.

You are free to configure the project however you like. What is important is that you document the choices you make and why you made them.

If you run out of time to perform the actual configuration, please document what you would have done.

## Task Two - Component Build

Using the following unit test as a foundation, recreate a reusable component that would result in all of these tests passing.

Whilst the unit test was originally written with a specific testing library, if you need to refactor the functions to reflect a different package that is fine.

Consider the flexibility of this component, how you might break this down for different use cases, what configuration the end-consumer might need / want.

```typescript
describe('Modal', () => {
  const mockClose = vi.fn();

  beforeAll(() => {
    mockClose.mockReset()
  });

  test('renders modal with expected controls', () => {
    render(<Scenario />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  describe('when passed onClose handler', () => {
    test('calls onClose action when pressing the ESC key', () => {
      render(<Scenario onClose={mockClose} />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('renders dismissible button that calls onClose action when clicked', async () => {
      const { user } = renderWithUser(<Scenario onClose={mockClose} />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClock action when clicking outside of the modal', async () => {
      const { user } = renderWithUser(<Scenario data-testid="mockId" onClose={mockClose} />);
      const scrimElement = screen.getByTestId('mockId');
      await user.click(scrimElement);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
```