<select name="<%= id %>" id="<%= id %>">
    <%_.forEach(films, function(film) { %>
            <option value="<%= film.number %>"><%= film.name %></option>
        <% });
    %>
</select>