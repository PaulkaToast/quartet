package quartet;

import static quartet.Server.PageState;
import static quartet.Server.pageStateList;

class UserSession {
    PageState pageState;

    UserSession(int pageStateId) {
        pageState = pageStateList.get(pageStateId);
    }

}
