package quartet;

import java.util.UUID;

import static quartet.Server.*;

class UserSession {
    String token;
    PageState pageState;

    UserSession(int pageStateId) {
        this.token = UUID.randomUUID().toString();;
        pageState = pageStateList.get(pageStateId);
    }

}
