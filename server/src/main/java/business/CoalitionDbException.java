package business;

public class CoalitionDbException extends RuntimeException {

    public CoalitionDbException(String message) {
        super(message);
    }

    public CoalitionDbException(String message, Throwable cause) {
        super(message, cause);
    }

    public static class CoalitionConnectionDbException extends CoalitionDbException {
        public CoalitionConnectionDbException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static class CoalitionQueryDbException extends CoalitionDbException {
        public CoalitionQueryDbException(String message) {
            super(message);
        }

        public CoalitionQueryDbException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
